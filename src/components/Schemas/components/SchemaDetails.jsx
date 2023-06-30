import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.css';
import { keysLiteral, prettyField } from '../../../utils';
import { schemaResolverService } from '../../../services/schemaResolver';

// Use this component to represent the key-value data.
function PropertyField({ field, value }) {
  // Base on type of value being passed, render it in a proper way.
  const renderValue = () => {
    if (typeof value === 'object' && Array.isArray(value))
      return (
        <>
          {value.map((item) => (
            <p
              key={item}
              className='padding-left--md margin-bottom--sm margin-top--md'
            >
              <span>- </span>
              <span className='text--primary'>{item}</span>
            </p>
          ))}
        </>
      );

    // Stringify the value to make sure it is being rendered on UI.
    return <span className='text--primary'>{String(value)}</span>;
  };

  return (
    <strong>
      <span className='text--capitalize'>{prettyField(field)}:</span>
      <span className='margin-left--sm'>{renderValue()}</span>
    </strong>
  );
}

function PropertyAttribute({ attribute, isLoading }) {
  const renderAttribute = () => {
    if (isLoading)
      return (
        <div className={styles['attribute-container']}>
          <div className={`${styles['skeleton-title']} skeleton`} />
          <div
            className={`${styles['skeleton-content-md']} skeleton margin-top--lg`}
          />
          <div
            className={`${styles['skeleton-content-lg']} skeleton margin-top--lg`}
          />
          <div
            className={`${styles['skeleton-content-xl']} skeleton margin-top--lg`}
          />
        </div>
      );

    if (!attribute) return null;

    const keys = keysLiteral(attribute);

    return (
      <div className={`${styles['attribute-container']} card`}>
        {Object.entries(attribute).map(([attributeKey, attributeValue]) => (
          <p>
            <PropertyField field={keys[attributeKey]} value={attributeValue} />
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className='margin-top--md'>
      <h6 className={`${styles['section-title']} margin-bottom--md`}>
        Attribute
      </h6>
      {renderAttribute()}
    </div>
  );
}

function SchemaProperty({ schema, isLoading }) {
  const propertyEntries = Object.entries(schema.properties);

  const renderProperties = () => {
    const propertyEntries = Object.entries(schema.properties);

    if (!propertyEntries.length) return null;

    return propertyEntries.map(([key, property]) => {
      const propertyKeys = keysLiteral(property);
      const isRequired = schema.required.includes(key);
      const propertyAttribute = (
        schema?.raw?.attributes?.attributes ?? []
      ).find((attribute) => attribute.key === key);
      return (
        <div
          key={key}
          className={`${styles['property-field']} table-of-contents__left-border padding-left--lg`}
        >
          <h6 className={styles['property-title']}>
            <span>{prettyField(key)}</span>
            {' - '}
            <i className='text--primary'>
              {isRequired ? 'Required' : 'Optional'}
            </i>
          </h6>
          <div
            className={`${styles.properties} table-of-contents__left-border`}
          >
            {Object.entries(property).map(([fieldKey, fieldValue]) => {
              return (
                <div key={fieldKey}>
                  <PropertyField
                    field={propertyKeys[fieldKey]}
                    value={fieldValue}
                  />
                </div>
              );
            })}
            <PropertyAttribute
              attribute={propertyAttribute}
              isLoading={isLoading}
            />
          </div>
        </div>
      );
    });
  };

  if (!propertyEntries.length) return null;

  return (
    <>
      <h5 className={`${styles.subtitle} margin-top--lg`}>Properties</h5>
      <div className={styles['properties-container']}>{renderProperties()}</div>
    </>
  );
}

export function SchemaDetails({ schema, onRequestClose }) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schemaWithAttributes, setSchemaWithAttributes] = useState(schema);

  const keys = keysLiteral(schema);

  // Copy the schema as it is for easy management of data from user perspective.
  const handleCopySchema = () => {
    navigator.clipboard.writeText(
      JSON.stringify(schemaWithAttributes.raw, null, 2)
    );
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  useEffect(() => {
    schemaResolverService()
      .getSchema(schema.id)
      .then((res) => {
        setSchemaWithAttributes((prev) => ({ ...prev, raw: res }));
        setIsLoading(false);
      });
  }, [schema.id]);

  return (
    <motion.div
      key={schema.id}
      className={`${styles.container} --ifm-modal-overlay`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='margin-top--sm padding--lg'>
        <button
          className={`${styles.back} button button--md button--primary margin-bottom--lg`}
          onClick={onRequestClose}
        />

        <div className={styles.header}>
          <button
            className='button button--xs button--secondary'
            onClick={handleCopySchema}
          >
            {copied ? 'Copied!' : 'Copy schema'}
          </button>
          <h4 className={styles.title}>
            <motion.span
              layoutId={schema.id}
              className='margin-right--md'
              style={{ display: 'inline-block' }}
            >
              {schema.name}
            </motion.span>
          </h4>
        </div>
        <p>{schema.id}</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{ opacity: 0 }}
        >
          <div className={styles['meta-container']}>
            <PropertyField
              field={keys.additionalProperties}
              value={schema.additionalProperties ? 'yes' : 'no'}
            />
            <PropertyField field={keys.type} value={schema.type} />
          </div>
          <SchemaProperty schema={schemaWithAttributes} isLoading={isLoading} />
        </motion.div>
      </div>
    </motion.div>
  );
}

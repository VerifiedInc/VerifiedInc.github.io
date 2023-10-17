import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.css';
import { keysLiteral, prettyField } from '../../../utils';

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
      <span>{field}:</span>
      <span className='margin-left--sm'>{renderValue()}</span>
    </strong>
  );
}

/**
 * Render properties for the given schema.
 * @param properties
 * @param required
 * @returns {JSX.Element|null}
 * @constructor
 */
function SchemaProperty({ properties, required }) {
  const propertyEntries = Object.entries(properties);

  const renderProperties = () => {
    const propertyEntries = Object.entries(properties);

    if (!propertyEntries.length) return null;

    return propertyEntries.map(([key, property]) => {
      const propertyKeys = keysLiteral(property);
      const isRequired = (required || []).includes(key);

      const renderPropertyField = ([fieldKey, fieldValue]) => {
        if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
          return (
            <div key={fieldKey}>
              <PropertyField field={fieldKey} value={''} />
              <div className='margin-left--md'>
                {Object.entries(fieldValue).map(renderPropertyField)}
              </div>
            </div>
          );
        }

        if (Array.isArray(fieldValue)) {
          return (
            <div key={fieldKey}>
              <PropertyField field={fieldKey} value={''} />
              <div className='margin-left--md'>
                {fieldValue
                  .map((value, index) => [index + 1, value])
                  .map(renderPropertyField)}
              </div>
            </div>
          );
        }

        return (
          <div key={fieldKey}>
            <PropertyField
              field={propertyKeys[fieldKey] ?? fieldKey}
              value={JSON.stringify(fieldValue)}
            />
          </div>
        );
      };

      return (
        <div
          key={key}
          className={`${styles['property-field']} table-of-contents__left-border padding-left--lg`}
        >
          <h6 className={styles['property-title']}>
            <span>{key}</span>
            {' - '}
            <i className='text--primary'>
              {isRequired ? 'Required' : 'Optional'}
            </i>
          </h6>
          <div
            className={`${styles.properties} table-of-contents__left-border`}
          >
            {Object.entries(property).map(renderPropertyField)}
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

/**
 * Render the composition of a credential.
 * @param allOf
 * @param onCredentialClick
 * @returns {JSX.Element|null}
 * @constructor
 */
function SchemaComposition({ allOf, onCredentialClick }) {
  const renderComposites = () => {
    if (!allOf) return null;

    return allOf.map((property) => {
      const key = property.$ref;

      return (
        <div
          key={key}
          className={`${styles['property-field']} table-of-contents__left-border padding-left--lg`}
        >
          <h6 className={`${styles['property-title']} margin-bottom--none`}>
            <span>{prettyField(key)}</span>
          </h6>
          <button
            className='button button--sm button--outline button--primary'
            onClick={() => onCredentialClick(key)}
          >
            See Credential
          </button>
        </div>
      );
    });
  };

  if (!allOf) return null;

  return (
    <>
      <h5 className={`${styles.subtitle} margin-top--lg`}>Composes</h5>
      <div className={styles['properties-container']}>{renderComposites()}</div>
    </>
  );
}

/**
 * Render the details for a schema of atomic credential.
 * @param schema
 * @returns {JSX.Element}
 * @constructor
 */
function AtomicSchemaDetails({ schema }) {
  const keys = keysLiteral(schema);
  return (
    <>
      <div className={styles['meta-container']}>
        <PropertyField field={keys.type} value={schema.type} />
      </div>
      <SchemaProperty
        properties={schema.properties}
        required={schema.required}
      />
    </>
  );
}

/**
 * Render the details for a schema of composite credential.
 * @param schema
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
function CompositeSchemaDetails({ schema, ...rest }) {
  const schemaAllOf =
    schema.allOf ||
    schema.anyOf.find((item) => typeof item.allOf === 'object').allOf;
  const schemaDetails = (schema.anyOf || []).find(
    (item) => typeof item.properties === 'object'
  );

  const keys = keysLiteral(schema);
  const keysSchemaDetails = keysLiteral(schemaDetails || {});

  return (
    <>
      <div className={styles['meta-container']}>
        <PropertyField
          field={keys.type || keysSchemaDetails.type}
          value={schema.type || schemaDetails.type}
        />
      </div>
      {schemaAllOf && <SchemaComposition {...rest} allOf={schemaAllOf} />}
      {schemaDetails && (
        <SchemaProperty
          properties={schemaDetails.properties}
          required={schemaDetails.required}
        />
      )}
    </>
  );
}

/**
 * Render the schema details.
 * @param schema
 * @param onRequestClose
 * @param onCredentialClick
 * @returns {JSX.Element}
 * @constructor
 */
export function SchemaDetails({ schema, onRequestClose, onCredentialClick }) {
  const [copied, setCopied] = useState(false);

  const keys = keysLiteral(schema);

  const schemaIsAtomic =
    typeof keys.anyOf !== 'string' && typeof keys.allOf !== 'string';
  const schemaIsComposite =
    typeof keys.anyOf === 'string' || typeof keys.allOf === 'string';

  // Copy the schema as it is for easy management of data from user perspective.
  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(schema.raw, null, 2));
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

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
          {schemaIsAtomic && <AtomicSchemaDetails schema={schema} />}
          {schemaIsComposite && (
            <CompositeSchemaDetails
              schema={schema}
              onCredentialClick={onCredentialClick}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

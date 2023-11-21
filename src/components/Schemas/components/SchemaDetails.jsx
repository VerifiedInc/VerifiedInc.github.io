import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.css';

import { matchCredentialId } from '../../../utils';

const RenderProperty = ({ value, onCredentialClick }) => {
  if (Array.isArray(value)) {
    return (
      <ul style={{ listStyleType: 'decimal' }}>
        {value.map((item, index) => (
          <li key={index}>
            <RenderProperty
              value={item}
              onCredentialClick={onCredentialClick}
            />
          </li>
        ))}
      </ul>
    );
  } else if (typeof value === 'object' && !Array.isArray(value)) {
    return (
      <ul>
        {Object.entries(value).map(([key, valueItem], index) => (
          <li key={index}>
            <strong className='text--padding-left--md margin-bottom--sm margin-top--md'>
              {key}:
            </strong>{' '}
            <RenderProperty
              value={valueItem}
              onCredentialClick={onCredentialClick}
            />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <span className='text--primary'>
        {String(value)}
        {matchCredentialId(value) && (
          <button
            className='button button--sm button--outline button--primary margin-left--md'
            onClick={() => onCredentialClick(value)}
          >
            See Credential
          </button>
        )}
      </span>
    );
  }
};

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

  // Load the value of the schema.
  const loadValue = (schema) => {
    const copySchema = { ...schema };
    delete copySchema.raw;
    return copySchema;
  };

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
          <RenderProperty
            value={loadValue(schema)}
            onCredentialClick={onCredentialClick}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

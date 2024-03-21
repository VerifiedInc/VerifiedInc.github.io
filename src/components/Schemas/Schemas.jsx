import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

import styles from './Schemas.module.css';

import { SchemaDetails } from './components/SchemaDetails';
import { schemaResolverService } from '../../services/schemaResolver';
import { mapSchemaDto } from '../../mappers/mapSchemaDto';
import { prettyField } from '../../utils';

const filterBySchemaName =
  (filter) =>
  ([key]) => {
    return prettyField(key).toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  };

const sortBySchemaName = (a, b) => a.toLocaleString().localeCompare(b);

function SchemaCard({ schema, onSchemaSelect }) {
  const animationVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
    [`selected-${schema.id}`]: {
      backgroundColor: 'var(--ifm-color-primary)',
    },
    idle: {
      opacity: 1,
      transition: { duration: 0 },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      key={schema.id}
      className={`${styles['list-card']} ${schema.comingSoon ? styles['coming-soon']: ''}`}
      variants={animationVariants}
      whileHover={{ backgroundColor: 'var(--ifm-color-primary)' }}
      onClick={() => !schema.comingSoon && onSchemaSelect(schema)}
      layout
    >
      <motion.h3 layoutId={schema.id} className={styles['list-card-title']}>
        {schema.name}
      </motion.h3>
      {schema.comingSoon && <motion.span layoutId={schema.id + "span"} className={styles['coming-soon']}>Coming soon!</motion.span>}
    </motion.div>
  );
}

function SchemaCardSkeleton() {
  return <div className={styles['list-card-skeleton']} />;
}

function SchemasBody({ schemas }) {
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [filter, setFilter] = useState('');
  const containerRef = useRef();
  const [containerHeight, setContainerHeight] = useState('auto');
  const [containerMaxHeight, setContainerMaxHeight] = useState(0);

  const inView = useInView(containerRef, { amount: 'some' });
  const [viewed, setViewed] = useState(inView);
  const data = Object.entries(schemas).map(mapSchemaDto);
  const dataParsed = data
    .filter(filterBySchemaName(filter))
    .sort(sortBySchemaName);
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.025,
      },
    },
    selected: {},
    idle: {},
  };

  // This controls the steps of animation for the cards.
  // It goes from: undefined -> show -> idle | selected-id
  const animate = useMemo(() => {
    if (selectedSchema) return `selected-${selectedSchema.id}`;
    if (viewed) return 'idle';
    return inView ? 'show' : undefined;
  }, [selectedSchema, inView, viewed]);

  useEffect(() => {
    if (viewed) return;
    // The first time user sees the content we show the animation and set as viewed.
    inView && setViewed(true);
  }, [inView, viewed]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entryHeight = entries[0].contentRect.height;
      // Set always the larger number for the height to handle expanded state.
      setContainerMaxHeight((prev) => Math.max(prev, entryHeight));
      setContainerHeight(entryHeight);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      className={styles.container}
      animate={{
        height: selectedSchema ? containerMaxHeight : containerHeight,
        transition: { duration: 0.2 },
      }}
      layout
    >
      <motion.div ref={containerRef}>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={animate}
          whileInView='show'
          viewport={{ once: true, margin: '-50%' }}
        >
          <input
            className={styles.search}
            placeholder='Search for a schema e.g Email Credential'
            onChange={(e) => setFilter(e.target.value)}
          />
          {!dataParsed.length && (
            <h2 className='text--center margin-top--lg margin-bottom--lg'>
              No schema found with term {filter}
            </h2>
          )}
          <motion.div className={styles['container-grid']}>
            <AnimatePresence>
              {dataParsed.map(([key, schema]) => (
                <SchemaCard
                  key={key}
                  schema={schema}
                  onSchemaSelect={setSelectedSchema}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <AnimatePresence initial={false}>
          {selectedSchema && (
            <SchemaDetails
              schema={selectedSchema}
              onRequestClose={() => setSelectedSchema(null)}
              onCredentialClick={async (credential) => {
                setSelectedSchema(null);
                // wait .5 seconds to select the match credential.
                await new Promise((resolve) => setTimeout(resolve, 500));
                // Get from schema data entries the selected credential.
                const matchCredential = data.find(
                  (item) => item[0] === credential
                )[1];
                setSelectedSchema(matchCredential);
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Schemas(props) {
  const [isLoading, setIsloading] = useState(true);
  const [schemas, setSchemas] = useState(null);

  // Numbers of schema is for adding the number of renders for SchemaCardSkeleton to have a good feedback for user.
  const NUMBER_OF_SCHEMAS_SKELETON = 28;

  useEffect(() => {
    setIsloading(true);
    schemaResolverService()
      .getSchemas()
      .then((res) => {
        setSchemas(res);
        setIsloading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles['container-grid']}>
          {new Array(NUMBER_OF_SCHEMAS_SKELETON)
            .fill(undefined)
            .map((_, index) => (
              <SchemaCardSkeleton key={index} />
            ))}
        </div>
      </div>
    );

  return <SchemasBody schemas={schemas} />;
}

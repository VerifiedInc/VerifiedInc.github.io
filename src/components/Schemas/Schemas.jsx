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
      className={styles['list-card']}
      variants={animationVariants}
      whileHover={{ backgroundColor: 'var(--ifm-color-primary)' }}
      onClick={() => onSchemaSelect(schema)}
      layout
    >
      <motion.h3 layoutId={schema.id} className={styles['list-card-title']}>
        {schema.name}
      </motion.h3>
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
  console.log(animate);

  useEffect(() => {
    if (viewed) return;
    // The first time user sees the content we show the animation and set as viewed.
    inView && setViewed(true);
  }, [inView, viewed]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].contentRect.height);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      className={styles.container}
      animate={{ height: containerHeight, transition: { duration: 0.2 } }}
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
  const NUMBER_OF_SCHEMAS = 28;

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
          {new Array(NUMBER_OF_SCHEMAS).fill(undefined).map((_, index) => (
            <SchemaCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  return <SchemasBody schemas={schemas} />;
}

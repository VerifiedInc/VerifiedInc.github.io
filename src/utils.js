// This pattern will split camel cased string out of the credential,
// when a camel word contain a sequence of uppercase character it is kept to maintain consistency of that word.
const schemaNamePattern = /([A-Z][a-z0-9]+)/gm;

// Format the camel cased text to a human-readable.
export const prettyField = (field) =>
  field
    .split(schemaNamePattern)
    .filter((e) => e)
    .join(' ');

// Return an object literal with key as values.
export const keysLiteral = (object) =>
  Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: key }), {});

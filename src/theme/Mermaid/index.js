import React from 'react';
import Mermaid from '@theme-original/Mermaid';

// The original renders nothing server-side (Mermaid needs a browser to lay out)
// and swaps in an SVG after hydration, so diagrams were missing from the built
// HTML, the copy button, and the .md files. The hidden pre fixes all three: the
// Markdown converter reads `language-*` and emits a ```mermaid fence.
// The `%%{init}%%` block is theme colors, useless to a reader of the Markdown.
const withoutTheme = (value) => {
  return (value || '').replace(/^\s*%%\{[\s\S]*?\}%%\s*/, '');
};

export default function MermaidWrapper(props) {
  return (
    <>
      <pre hidden className='language-mermaid'>
        <code>{withoutTheme(props.value)}</code>
      </pre>
      <Mermaid {...props} />
    </>
  );
}

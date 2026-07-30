import React from 'react';
import Mermaid from '@theme-original/Mermaid';

// The original renders nothing server-side (Mermaid needs a browser to lay out)
// and swaps in an SVG after hydration, so diagrams were missing from the built
// HTML, the copy button, and the .md files. The hidden pre fixes all three: the
// Markdown converter reads `language-*` and emits a ```mermaid fence.
export default function MermaidWrapper(props) {
  return (
    <>
      <pre hidden className='language-mermaid'>
        <code>{props.value}</code>
      </pre>
      <Mermaid {...props} />
    </>
  );
}

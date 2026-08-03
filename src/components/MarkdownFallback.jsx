import React from 'react';

// A component that fetches on mount renders nothing useful on the server, so the
// page's `.md` twin comes out as an empty shell ("Loading…" and a blank table).
// Wrap it and pass the Markdown a reader should get instead: the endpoint behind
// the widget, usually, so an agent can go get the data itself.
//
// The text ships in a `data-markdown` attribute and is emitted verbatim, so it
// is real Markdown rather than something reconstructed from the DOM. The widget
// itself is marked so the converter skips its placeholder markup.
export function MarkdownFallback({ markdown, children }) {
  return (
    <>
      <div data-markdown={markdown} hidden />
      <div data-markdown-ignore>{children}</div>
    </>
  );
}

export default MarkdownFallback;

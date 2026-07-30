/**
 * Public surface of the "Copy page" feature. Import the layer you need:
 * `CopyPageButton` (also default) for the ready-made button, `usePageMarkdown`
 * for a custom UI, `htmlToMarkdown` for the converter alone, the config values
 * to override a default rather than restate it. See README.md.
 */

export { CopyPageButton, default } from './CopyPageButton';
export { usePageMarkdown } from './usePageMarkdown';
export { htmlToMarkdown } from './htmlToMarkdown';
export { copyTextToClipboard } from './clipboard';
export * from './config';

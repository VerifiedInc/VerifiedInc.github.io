import { ClaudeIcon, GeminiIcon, OpenAiIcon } from './icons';

/**
 * Defaults for the "Copy page" feature. Every value is overridable per page via
 * {@link CopyPageButton} props, or site wide via `customFields.copyPage` in
 * `docusaurus.config.js`, so restyling, relabeling, and adding AI targets never
 * means editing the component.
 */

// The rendered doc-content container the Markdown is read from.
export const DEFAULT_CONTENT_SELECTOR = '.theme-doc-markdown';

// Where the button sits relative to the page content.
export const PLACEMENTS = ['top', 'bottom'];

// Horizontal alignment, mapped to the flexbox value used by the container.
export const ALIGNMENT_TO_JUSTIFY_CONTENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const DEFAULT_PLACEMENT = 'top';

export const DEFAULT_ALIGN = 'right';

// How long the "Copied" (or "Copy failed") confirmation stays visible.
export const DEFAULT_STATUS_RESET_MS = 2000;

// All user-facing text, in one place (easy to translate or reword).
export const DEFAULT_LABELS = {
  copyPage: 'Copy page',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  copyMarkdown: 'Copy as Markdown',
  viewMarkdown: 'View as Markdown',
  moreOptions: 'More copy options',
};

/**
 * AI assistants shown in the dropdown. Each target builds a URL from a prompt.
 * Add, remove, or reorder these through the `aiTargets` prop.
 * @type {{ id: string, label: string, icon: JSX.Element, buildUrl: (prompt: string) => string }[]}
 */
export const DEFAULT_AI_TARGETS = [
  {
    id: 'chatgpt',
    label: 'Open in ChatGPT',
    icon: <OpenAiIcon fontSize='small' />,
    buildUrl: (prompt) => {
      return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    },
  },
  {
    id: 'claude',
    label: 'Open in Claude',
    icon: <ClaudeIcon fontSize='small' />,
    buildUrl: (prompt) => {
      return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
    },
  },
  {
    id: 'gemini',
    label: 'Open in Gemini',
    icon: <GeminiIcon fontSize='small' />,
    buildUrl: (prompt) => {
      return `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`;
    },
  },
];

/**
 * Prompt handed to an assistant. Sends the page URL, not the Markdown: query
 * strings cannot hold a full doc page. `markdown` is available for callers who
 * want to inline it on short pages.
 * @param {{ pageUrl: string, pageTitle: string, markdown: string }} page
 * @returns {string}
 */
export const defaultBuildPrompt = ({ pageUrl, pageTitle }) => {
  const subject = pageTitle ? `"${pageTitle}"` : 'page';

  return `Read the Verified documentation ${subject} at ${pageUrl} and help me with questions about it.`;
};

/**
 * Appended to the Markdown so a pasted page still says where it came from.
 * Disable with `includeSource={false}`.
 * @param {{ pageUrl: string }} page
 * @returns {string}
 */
export const defaultBuildSourceNote = ({ pageUrl }) => {
  return `---\n\nSource: ${pageUrl}`;
};

import { ClaudeIcon, GeminiIcon, OpenAiIcon } from './icons';

// Defaults for the "Copy page" feature. Each is overridable per page via
// CopyPageButton props, or site-wide via `customFields.copyPage`.

export const DEFAULT_CONTENT_SELECTOR = '.theme-doc-markdown';

export const PLACEMENTS = ['top', 'bottom'];

export const ALIGNMENT_TO_JUSTIFY_CONTENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const DEFAULT_PLACEMENT = 'top';

export const DEFAULT_ALIGN = 'right';

export const DEFAULT_STATUS_RESET_MS = 2000;

export const DEFAULT_LABELS = {
  copyPage: 'Copy page',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  copyMarkdown: 'Copy as Markdown',
  viewMarkdown: 'View as Markdown',
  moreOptions: 'More copy options',
};

/**
 * Assistants in the dropdown; add, remove, or reorder via the `aiTargets` prop.
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
 * Sends a URL, not the Markdown: query strings cannot hold a full page. Points
 * at the `.md` twin, a better fetch target than the HTML. `markdown` is passed
 * through for callers who want to inline it on short pages.
 * @param {{ pageUrl: string, markdownUrl: string, pageTitle: string, markdown: string }} page
 * @returns {string}
 */
export const defaultBuildPrompt = ({ pageUrl, markdownUrl, pageTitle }) => {
  const subject = pageTitle ? `"${pageTitle}"` : 'page';

  const target = markdownUrl ? new URL(markdownUrl, pageUrl).href : pageUrl;

  return `Read the Verified documentation page ${subject} from the Markdown URL below. Use it as the primary source when answering my questions:\n\n${target}`;
};

/**
 * Appended so a pasted page says where it came from. Off via `includeSource`.
 * @param {{ pageUrl: string }} page
 * @returns {string}
 */
export const defaultBuildSourceNote = ({ pageUrl }) => {
  return `---\n\nSource: ${pageUrl}`;
};

# CopyPageButton

Exports a doc page as clean Markdown for use with ChatGPT, Claude, and Gemini.
The page is converted client-side from its rendered HTML, so there is no
build-time generation, no `llms.txt`, and no external plugin.

## Layers

Pick the layer that matches how much control you need. Each one is usable on its
own.

| Layer                  | File                                  | Use it when                                                |
| ---------------------- | ------------------------------------- | ---------------------------------------------------------- |
| `htmlToMarkdown()`     | `htmlToMarkdown.mjs`                  | You only want HTML converted to Markdown.                  |
| `usePageMarkdown()`    | `usePageMarkdown.js`                  | You want the actions but your own UI.                      |
| `<CopyPageButton />`   | `CopyPageButton.jsx`                  | You want the ready-made button.                            |
| Theme wrapper          | `src/theme/DocItem/Content/index.js`  | You want it on every doc page.                             |
| `config.jsx`           | `config.jsx`                          | You want to change a default instead of restating one.     |
| Build-time output      | `plugins/markdown-pages/index.js`     | You want the `.md` files, `llms.txt`, or the search index. |
| `<MarkdownFallback />` | `src/components/MarkdownFallback.jsx` | A page's content only exists after a client-side fetch.    |

`.mjs` on the converter is deliberate: it is imported by the browser bundle and
by the build-time plugin in Node, so it has to be real ESM.

## Turning it on and off

`src/theme/DocItem/Content/index.js` mounts the button above the content of
every doc page. Configuration is layered, most specific wins.

Site wide, in `docusaurus.config.js`:

```js
customFields: {
  copyPage: {
    enabled: true,
    align: 'right', // 'left' | 'center' | 'right'
    placement: 'top', // 'top' | 'bottom'
  },
},
```

Per page, in the MDX front matter:

```yaml
---
title: My page
copy_page: false # hide it on this page
---
```

```yaml
---
copy_page:
  align: left
  placement: bottom
  includeSource: false
---
```

Any `CopyPageButton` prop that can be written in YAML works in that object.

By hand, anywhere in a page body (pair with `copy_page: false` so the page does
not render two buttons):

```mdx
import CopyPageButton from '@site/src/components/CopyPageButton';

<CopyPageButton align='left' excludeActionIds={['gemini']} />
```

## Props

| Prop                                      | Default                      | Purpose                                              |
| ----------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| `align`                                   | `'right'`                    | Horizontal alignment of the button row.              |
| `variant`/`size`/`color`/`sx`/`className` | MUI outlined, small, inherit | Styling passthrough.                                 |
| `labels`                                  | `DEFAULT_LABELS`             | All user-facing text; merged over the defaults.      |
| `aiTargets`                               | ChatGPT, Claude, Gemini      | Assistants in the dropdown.                          |
| `buildPrompt`                             | `defaultBuildPrompt`         | `({ pageUrl, pageTitle, markdown }) => string`.      |
| `contentSelector`                         | `'.theme-doc-markdown'`      | Which container is converted.                        |
| `converterOverrides`                      | none                         | `{ handlers, matchers }` passed to `htmlToMarkdown`. |
| `includeSource`                           | `true`                       | Append the page URL to the Markdown.                 |
| `actions`                                 | copy, view, AI targets       | Replace the action list outright.                    |
| `extraActions`                            | `[]`                         | Append actions.                                      |
| `excludeActionIds`                        | `[]`                         | Remove actions by id.                                |
| `primaryActionId`                         | `'copy'`                     | Which action the main button runs.                   |
| `showMenu`                                | `true`                       | Render the dropdown at all.                          |

## Extending

Add an action. `onSelect` receives the same helpers the built-in actions use:

```jsx
<CopyPageButton
  extraActions={[
    {
      id: 'slack',
      label: 'Copy for Slack',
      icon: <Chat fontSize='small' />,
      onSelect: async ({ getMarkdown }) => {
        await copyTextToClipboard(toSlackMarkup(getMarkdown()));
      },
    },
  ]}
/>
```

Teach the converter a new element. `matchers` run before `handlers` and are
checked in order, so a matcher can also override a built-in one:

```js
<CopyPageButton
  converterOverrides={{
    handlers: {
      // Tag name -> (element, context) => string
      abbr: (element, context) => {
        return `${context.inline(element)} (${element.getAttribute('title')})`;
      },
    },
    matchers: [
      {
        test: (element) => {
          return element.classList.contains('payer-table');
        },
        handle: (element, context) => {
          return context.block(element);
        },
      },
    ],
  }}
/>
```

`context.inline(element)` and `context.block(element)` convert an element's
children, so handlers stay small and compose.

Build a different UI entirely:

```jsx
import { usePageMarkdown } from '@site/src/components/CopyPageButton';

function CopyLink() {
  const { copyMarkdown, copyStatus } = usePageMarkdown();

  return (
    <a onClick={copyMarkdown}>{copyStatus === 'copied' ? 'Copied' : 'Copy'}</a>
  );
}
```

The AI targets carry their own brand marks, inlined as `SvgIcon` components in
`icons.jsx` (official monochrome paths, `currentColor`, no network request).

Gemini is reached through Google Search with `udm=50` (AI Mode) rather than
`gemini.google.com`, which ignores a prefilled `q`.

## Markdown twins (`/page` and `/page.md`)

`plugins/markdown-pages` emits a Markdown file next to every doc page at build
time, so `https://docs.verified.inc/dashboard-sso-guide` also answers at
`.../dashboard-sso-guide.md`. Agents and crawlers get clean Markdown without
scraping HTML.

"View as Markdown" links straight to that file, and the AI prompts point
assistants at it rather than the HTML page.

It converts the **built HTML** with this same converter, not the source MDX:
rendered HTML already has Tabs, admonitions, and reusable partials expanded.
`jsdom` (a devDependency) supplies the DOM; nothing extra ships to the browser.

Options, set where the plugin is registered in `docusaurus.config.js`:

| Option             | Default                         | Purpose                                                         |
| ------------------ | ------------------------------- | --------------------------------------------------------------- |
| `contentSelector`  | `.theme-doc-markdown`           | Which container is converted.                                   |
| `categorySelector` | `[class*="generatedIndexPage"]` | Fallback for category landing pages, which have no doc content. |
| `exclude`          | `['/reusables/']`               | Route prefixes to skip.                                         |
| `includeSource`    | `true`                          | Append the page URL to each file's footer.                      |
| `llms`             | `{}`                            | `false` skips `llms.txt`/`llms-full.txt`; see below.            |

Every internal link is rewritten to point at the target's `.md` twin, so an
agent following a reference stays in Markdown. Same-origin routes only: other
origins, asset paths with their own extension, and excluded prefixes are left
alone. Category landing pages get twins too, which is what makes the section
links below resolve.

### Page footers

Each file ends with where it sits in the docs, so an agent can walk a product in
order instead of guessing:

```
---

Source: https://docs.verified.inc/1-click-health/overview
Section: 1-Click Health — https://docs.verified.inc/1-click-health.md
Next: User Experience — https://docs.verified.inc/1-click-health/user-experience.md
```

`Previous`/`Next` come from the page's `pagination-nav`, which lives outside the
content element, so it is read straight from the DOM. `Section` points at the
product's category twin. Three things are deliberately omitted: a neighbour with
no twin of its own (a `reusables` fragment, say), `Section` on a category page
(it would link to itself), and `Previous` when it duplicates `Section` (the
category page is the first entry in its own section).

### search-index.json

A third file, for consumers that need to find a page rather than read one:

```json
{
  "type": "section",
  "title": "Eligibility Check",
  "page": "API Integration",
  "section": "1-Click Health",
  "url": "https://docs.verified.inc/1-click-health/guides/api-integration.md#eligibility-check",
  "content": "To run an eligibility check, call POST /1-click/health with..."
}
```

495 entries today: one per page, plus one per `h2`/`h3`/`h4` carrying that
section's text. Section entries are built by walking siblings after each heading
until the next one, from the same DOM the conversion uses.

The docs site also ships `search-doc.json` and `lunr-index.json` from
`docusaurus-lunr-search`, and `search-doc.json` has almost the same shape. We
emit our own because those URLs point at the HTML pages, and because the format
belongs to that plugin rather than to us. Filtering ours needs no library:

```bash
curl -s https://docs.verified.inc/search-index.json \
  | jq -r '.entries[] | select(.content | test("eligibility"; "i")) | .url'
```

The index is ~900 KB, mostly a few large API-reference code samples. It is meant
to be filtered where it is downloaded, not read whole.

`postBuild` does not run under `npm start`, so the `.md` files exist in
`npm run build` output and in production, not in dev. "Copy page" still works in
dev (it converts client-side), but "View as Markdown" 404s there; use
`npm run serve` to check it against a build.

### llms.txt and llms-full.txt

The same plugin writes the two [llmstxt.org](https://llmstxt.org) files:

- **`/llms.txt`** (4 KB): an index. Site title, tagline, then every page grouped
  into sections, linking the `.md` URL with its front-matter `description` (or
  the page's first paragraph when there is none).
- **`/llms-full.txt`** (~540 KB): every page concatenated in reading order,
  separated by `---`. Each page keeps its own `# Title` and footer, so an
  assistant can cite the page it used and keep navigating from there.

Both are built from the same converted strings as the `.md` files, so they
cannot drift from them. Section order lives in the plugin's `llms.sections`
option; the sidebar is autogenerated from the folder tree, so there is no
sidebar order to read and this list mirrors it by hand. Root-level pages come
first under `Getting Started`, and each section leads with its `overview`.

Pass `llms: false` in the plugin options to skip both files.

## Known limits

- Content that only exists after a client-side fetch is not in the server HTML,
  so it cannot be converted. Supported Payers is the case in the docs today: its
  table loads from the Verified API, and a naive conversion produces "Loading…"
  and an empty table, which reads as "there are no payers". Those pages wrap the
  widget in `MarkdownFallback` (`src/components/MarkdownFallback.jsx`) and pass
  the Markdown a reader should get instead, usually the endpoint behind the
  widget. It ships as a `data-markdown` attribute and is emitted verbatim rather
  than converted, and the widget's own markup is skipped via
  `[data-markdown-ignore]`. This is the one place where the Markdown is
  deliberately different from the page.
- Inline SVG is skipped: its text nodes convert to noise. Mermaid diagrams are
  included as ```mermaid fences, via `src/theme/Mermaid/index.js`, which renders
a hidden `<pre class="language-mermaid">` next to the rendered diagram. The
  original component draws the SVG client-side only, so without that swizzle the
  diagrams are absent from the built HTML entirely.
- The AI targets pass the page URL rather than the Markdown, because query
  strings cannot hold a full doc page. The assistant fetches the page itself.

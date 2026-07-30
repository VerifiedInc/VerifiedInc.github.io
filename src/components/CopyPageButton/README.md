# CopyPageButton

Exports a doc page as clean Markdown for use with ChatGPT, Claude, and Gemini.
The page is converted client-side from its rendered HTML, so there is no
build-time generation, no `llms.txt`, and no external plugin.

## Layers

Pick the layer that matches how much control you need. Each one is usable on its
own.

| Layer                | File                                 | Use it when                                            |
| -------------------- | ------------------------------------ | ------------------------------------------------------ |
| `htmlToMarkdown()`   | `htmlToMarkdown.js`                  | You only want HTML converted to Markdown.              |
| `usePageMarkdown()`  | `usePageMarkdown.js`                 | You want the actions but your own UI.                  |
| `<CopyPageButton />` | `CopyPageButton.jsx`                 | You want the ready-made button.                        |
| Theme wrapper        | `src/theme/DocItem/Content/index.js` | You want it on every doc page.                         |
| `config.js`          | `config.js`                          | You want to change a default instead of restating one. |

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

## Known limits

- `CollapsibleGroup` unmounts collapsed section bodies, so a collapsed section is
  not in the DOM and therefore not exported. The fix (render the body always,
  hide it with `hidden="until-found"`) lives on the `enhancement/docs-revisions`
  branch; once that lands, collapsed content exports too.
- Mermaid diagrams and inline SVG are skipped. Their source is not in the DOM,
  and the rendered text nodes convert to noise.
- The AI targets pass the page URL rather than the Markdown, because query
  strings cannot hold a full doc page. The assistant fetches the page itself.

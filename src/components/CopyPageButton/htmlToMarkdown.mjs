/**
 * HTML-to-Markdown converter for the "Copy page" feature. Runs on rendered
 * output, so MDX components come through already expanded.
 *
 * Two open maps, both overridable per call: `matchers` (ordered
 * `{test, handle}` rules, checked first, for class/attribute cases) and
 * `handlers` (tag name -> handle). New elements need no traversal changes.
 *
 * `.mjs` because Node needs real ESM for the markdown-pages plugin, and
 * babel-loader only compiles `.js`/`.jsx`, so this ships untranspiled: no
 * optional chaining.
 */

const ZERO_WIDTH = /[​‌‍﻿]/g;

const NON_BREAKING_SPACE = / /g;

// UI chrome we never want in the output.
const SKIP_SELECTORS = [
  '.hash-link',
  '.copy-page-button-root',
  '.theme-code-block-buttons',
  '.clean-btn',
  'button',
  '[aria-hidden="true"]',
  // Rendered diagrams: SVG text nodes convert to noise and the Mermaid source is not in the DOM to fall back to.
  'svg',
  '.docusaurus-mermaid-container',
  // Not content: server-rendered emotion styles sit inside the article and would otherwise be converted as text.
  'style',
  'script',
  'noscript',
  'template',
];

// `[hidden]` is deliberately kept: unselected tab panels, collapsed bodies, and
// the Mermaid source all live behind it.

// Unhandled elements are transparent, but block ones still need separating, or
// a component's label runs into the next line's text.
const BLOCK_TAGS = new Set([
  'div',
  'section',
  'article',
  'header',
  'footer',
  'aside',
  'main',
  'form',
  'fieldset',
  'label',
  'legend',
  'address',
]);

function cleanText(text) {
  return text
    .replace(ZERO_WIDTH, '')
    .replace(NON_BREAKING_SPACE, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/[ \t]+/g, ' ');
}

function isSkipped(element) {
  if (typeof element.matches !== 'function') {
    return false;
  }

  return SKIP_SELECTORS.some((selector) => {
    return element.matches(selector);
  });
}

// Labels are often already bold in the source; avoids `****text****`.
function bold(text) {
  if (!text) {
    return '';
  }

  return /^\*\*[\s\S]*\*\*$/.test(text) ? text : `**${text}**`;
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

// `element.href` is already resolved against the document URL, so links survive
// being read outside the site. Falls back to the raw attribute when the document
// has no base URL (jsdom without `url`).
function absoluteUrl(element, attribute) {
  const resolved = element[attribute];

  const raw = element.getAttribute(attribute) || '';

  return typeof resolved === 'string' && /^https?:/.test(resolved)
    ? resolved
    : raw;
}

function toBlockquote(inner) {
  const body = inner
    .trim()
    .split('\n')
    .map((line) => {
      return line ? `> ${line}` : '>';
    })
    .join('\n');

  return `\n${body}\n\n`;
}

// Strips line-number gutters, "Copy" buttons, and zero-width chars.
function extractCodeBlock(preElement) {
  const codeElement = preElement.querySelector('code') || preElement;

  const lineElements = codeElement.querySelectorAll(
    '.token-line, span[data-line]'
  );

  let text;

  if (lineElements.length > 0) {
    text = Array.from(lineElements)
      .map((line) => {
        const clone = line.cloneNode(true);

        clone
          .querySelectorAll(
            '.token-line-number, .linenumber, [style*="user-select: none"]'
          )
          .forEach((node) => {
            node.remove();
          });

        return clone.textContent;
      })
      .join('\n');
  } else {
    text = codeElement.textContent;
  }

  text = text
    .replace(ZERO_WIDTH, '')
    .replace(/^\s*Copy(\s+to clipboard)?\s*$/gim, '')
    .replace(/\n+$/, '');

  // `language-*` sits on the <pre>; the <code> carries an unrelated class.
  const classNames = [codeElement.className, preElement.className].join(' ');

  const languageMatch = classNames.match(/language-([\w-]+)/);

  const language = languageMatch ? languageMatch[1] : '';

  return { text, language };
}

function listToMarkdown(listElement, ordered, context) {
  let output = '\n';
  let index = 1;

  // Not `children`: the docs wrap items in other tags (`<ol><b><li>`), and a
  // direct-child walk drops the whole list. Ownership by closest list keeps
  // nested lists with their own parent.
  const listItems = Array.from(listElement.querySelectorAll('li')).filter(
    (listItem) => {
      return listItem.closest('ul, ol') === listElement;
    }
  );

  listItems.forEach((listItem) => {
    const marker = ordered ? `${index}. ` : '- ';

    const [firstLine, ...remainingLines] = context
      .block(listItem)
      .trim()
      .split('\n');

    output += `${marker}${firstLine}\n`;

    remainingLines.forEach((line) => {
      output += line ? `  ${line}\n` : '\n';
    });

    index += 1;
  });

  return `${output}\n`;
}

function tableToMarkdown(tableElement, context) {
  const rows = Array.from(tableElement.querySelectorAll('tr'));

  if (rows.length === 0) {
    return '';
  }

  const getCells = (row) => {
    return Array.from(row.querySelectorAll('th, td')).map((cell) => {
      return (
        context
          .inline(cell)
          .replace(/\s*\n\s*/g, ' ')
          .trim()
          // A literal backslash before a pipe would escape the escape below and
          // split the row. Only those are doubled: escaping every backslash
          // would corrupt code spans, where GFM treats them literally.
          .replace(/\\(?=\|)/g, '\\\\')
          .replace(/\|/g, '\\|')
      );
    });
  };

  // Markdown has no row headers. A first row mixing th and td is a key/value
  // table, so it gets an empty header rather than losing its first row.
  const firstRowCells = Array.from(rows[0].querySelectorAll('th, td'));

  const hasHeaderRow =
    firstRowCells.length > 0 &&
    firstRowCells.every((cell) => {
      return cell.tagName === 'TH';
    });

  const bodyRows = hasHeaderRow ? rows.slice(1) : rows;

  const headerCells = hasHeaderRow
    ? getCells(rows[0])
    : getCells(rows[0]).map(() => {
        return '';
      });

  const separatorCells = headerCells.map(() => {
    return '---';
  });

  const toRow = (cells) => {
    return `| ${cells.join(' | ')} |`;
  };

  const lines = [toRow(headerCells), toRow(separatorCells)];

  bodyRows.forEach((row) => {
    lines.push(toRow(getCells(row)));
  });

  return `\n${lines.join('\n')}\n\n`;
}

function heading(level) {
  return (element, context) => {
    return `\n${'#'.repeat(level)} ${context.inline(element).trim()}\n\n`;
  };
}

const defaultHandlers = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),

  p: (element, context) => {
    const text = context.inline(element).trim();

    if (!text) {
      return '';
    }

    return `\n${text}\n\n`;
  },

  strong: (element, context) => {
    return bold(context.inline(element).trim());
  },

  b: (element, context) => {
    return bold(context.inline(element).trim());
  },

  em: (element, context) => {
    return `_${context.inline(element).trim()}_`;
  },

  i: (element, context) => {
    return `_${context.inline(element).trim()}_`;
  },

  del: (element, context) => {
    return `~~${context.inline(element).trim()}~~`;
  },

  code: (element) => {
    if (element.closest('pre')) {
      return element.textContent;
    }

    return `\`${element.textContent.replace(ZERO_WIDTH, '')}\``;
  },

  pre: (element, context, { isInline } = {}) => {
    const { text, language } = extractCodeBlock(element);

    // A fence would break the table row.
    if (isInline) {
      return `\`${text.replace(/\s+/g, ' ').trim()}\``;
    }

    return `\n\`\`\`${language}\n${text}\n\`\`\`\n\n`;
  },

  a: (element, context) => {
    const href = element.getAttribute('href') || '';

    const text = context.inline(element).trim();

    if (!text) {
      return '';
    }

    if (!href || href.startsWith('#')) {
      return text;
    }

    return `[${text}](${absoluteUrl(element, 'href')})`;
  },

  ul: (element, context) => {
    return listToMarkdown(element, false, context);
  },

  ol: (element, context) => {
    return listToMarkdown(element, true, context);
  },

  blockquote: (element, context) => {
    return toBlockquote(context.block(element));
  },

  hr: () => {
    return '\n---\n\n';
  },

  br: () => {
    return '  \n';
  },

  img: (element) => {
    const alt = element.getAttribute('alt') || '';

    return `![${alt}](${absoluteUrl(element, 'src')})`;
  },

  table: (element, context) => {
    return tableToMarkdown(element, context);
  },

  summary: (element, context) => {
    return `\n${bold(context.inline(element).trim())}\n\n`;
  },

  details: (element, context) => {
    return context.block(element);
  },

  dl: (element, context) => {
    return `\n${context.block(element).trim()}\n\n`;
  },

  dt: (element, context) => {
    return `\n${bold(context.inline(element).trim())}\n`;
  },

  dd: (element, context) => {
    return `${context.inline(element).trim()}\n`;
  },

  kbd: (element) => {
    return `\`${element.textContent.trim()}\``;
  },

  sup: (element, context) => {
    return `^${context.inline(element).trim()}`;
  },

  // No subscript in Markdown; keep the text.
  sub: (element, context) => {
    return context.inline(element).trim();
  },

  mark: (element, context) => {
    return bold(context.inline(element).trim());
  },

  figure: (element, context) => {
    return `\n${context.block(element).trim()}\n\n`;
  },

  figcaption: (element, context) => {
    return `\n_${context.inline(element).trim()}_\n\n`;
  },

  caption: (element, context) => {
    return `\n${bold(context.inline(element).trim())}\n`;
  },

  // Task-list checkboxes, the only meaningful input in docs.
  input: (element) => {
    if (element.getAttribute('type') !== 'checkbox') {
      return '';
    }

    return element.checked ? '[x] ' : '[ ] ';
  },
};

// Matchers checked before tag handlers (class/attribute based).
const defaultMatchers = [
  {
    test: (element) => {
      return (
        element.tagName === 'DIV' &&
        /(^|\s)admonition/i.test(element.className || '')
      );
    },

    handle: (element, context) => {
      const titleElement = element.querySelector(
        '[class*="admonitionHeading"]'
      );

      const bodyElement =
        element.querySelector('[class*="admonitionContent"]') || element;

      // Untitled admonitions render their type ("tip", "warning").
      const title = titleElement
        ? capitalize(context.inline(titleElement).trim())
        : '';

      const body = context.block(bodyElement).trim();

      return toBlockquote(title ? `${bold(title)}\n\n${body}` : body);
    },
  },
  {
    // Tabs keep every panel in the DOM (unselected ones just get `hidden`), so
    // export them all, paired with their label by position.
    test: (element) => {
      return /(^|\s)tabs-container(\s|$)/.test(element.className || '');
    },

    handle: (element, context) => {
      const tabListElement = element.querySelector('[role="tablist"]');

      const labels = tabListElement
        ? Array.from(tabListElement.children).map((tab) => {
            return context.inline(tab).trim();
          })
        : [];

      // Own panels only; nested Tabs get their own pass.
      const panels = Array.from(
        element.querySelectorAll('[role="tabpanel"]')
      ).filter((panel) => {
        return panel.closest('.tabs-container') === element;
      });

      const sections = panels.map((panel, index) => {
        const body = context.block(panel).trim();

        if (!body) {
          return '';
        }

        const label = labels[index];

        return label ? `${bold(label)}\n\n${body}` : body;
      });

      return `\n${sections.filter(Boolean).join('\n\n')}\n\n`;
    },
  },
  {
    // A tablist outside `.tabs-container` is pure UI.
    test: (element) => {
      return (
        typeof element.getAttribute === 'function' &&
        element.getAttribute('role') === 'tablist'
      );
    },

    handle: () => {
      return '';
    },
  },
  {
    // A code block's `title` prop renders in a sibling div.
    test: (element) => {
      return /codeBlockTitle/.test(element.className || '');
    },

    handle: (element, context) => {
      return `\n${bold(context.inline(element).trim())}\n`;
    },
  },
];

/**
 * @param {HTMLElement} rootElement the `.theme-doc-markdown` element
 * @param {{ handlers?: object, matchers?: Array }} [overrides]
 * @returns {string}
 */
export function htmlToMarkdown(rootElement, overrides = {}) {
  if (!rootElement) {
    return '';
  }

  const handlers = { ...defaultHandlers, ...(overrides.handlers || {}) };

  const matchers = [...(overrides.matchers || []), ...defaultMatchers];

  function childrenToMarkdown(element, isInline) {
    let output = '';

    element.childNodes.forEach((child) => {
      output += convert(child, isInline);
    });

    return output;
  }

  const context = {
    inline: (element) => {
      return childrenToMarkdown(element, true);
    },

    block: (element) => {
      return childrenToMarkdown(element, false);
    },
  };

  function convert(node, isInline) {
    // TEXT_NODE
    if (node.nodeType === 3) {
      return cleanText(node.textContent);
    }

    // Not an ELEMENT_NODE (comments and such), or UI chrome.
    if (node.nodeType !== 1 || isSkipped(node)) {
      return '';
    }

    const matcher = matchers.find((rule) => {
      return rule.test(node);
    });

    if (matcher) {
      return matcher.handle(node, context, { isInline });
    }

    const handler = handlers[node.tagName.toLowerCase()];

    if (handler) {
      return handler(node, context, { isInline });
    }

    if (isInline) {
      return context.inline(node);
    }

    if (BLOCK_TAGS.has(node.tagName.toLowerCase())) {
      return `\n${context.block(node)}\n`;
    }

    return context.block(node);
  }

  return context
    .block(rootElement)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

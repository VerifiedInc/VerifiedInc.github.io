import { useCallback, useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { htmlToMarkdown } from './htmlToMarkdown.mjs';
import { copyTextToClipboard } from './clipboard';
import {
  DEFAULT_CONTENT_SELECTOR,
  DEFAULT_STATUS_RESET_MS,
  defaultBuildSourceNote,
} from './config';

// Mirrors the file layout written by plugins/markdown-pages.
function toMarkdownUrl(pathname) {
  const withoutTrailingSlash = pathname.replace(/\/$/, '');

  return `${withoutTrailingSlash || '/index'}.md`;
}

/**
 * Headless layer: converts the rendered page and exposes the actions for it.
 * Renders nothing, so any UI can sit on top. {@link CopyPageButton} is one.
 *
 * @param {{
 *   contentSelector?: string,
 *   converterOverrides?: { handlers?: object, matchers?: Array },
 *   includeSource?: boolean,
 *   buildSourceNote?: (page: { pageUrl: string }) => string,
 *   statusResetMs?: number,
 * }} [options]
 */
export function usePageMarkdown({
  contentSelector = DEFAULT_CONTENT_SELECTOR,
  converterOverrides,
  includeSource = true,
  buildSourceNote = defaultBuildSourceNote,
  statusResetMs = DEFAULT_STATUS_RESET_MS,
} = {}) {
  const { siteConfig } = useDocusaurusContext();

  // 'idle' | 'copied' | 'error' — 'error' means the clipboard was blocked.
  const [copyStatus, setCopyStatus] = useState('idle');

  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const flashCopyStatus = useCallback(
    (status) => {
      setCopyStatus(status);

      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      resetTimeoutRef.current = setTimeout(() => {
        setCopyStatus('idle');
      }, statusResetMs);
    },
    [statusResetMs]
  );

  // Read on call, not on render: the content changes as tabs and collapsibles open.
  const getPage = useCallback(() => {
    if (typeof document === 'undefined') {
      return {
        markdown: '',
        pageUrl: '',
        markdownUrl: '',
        pageTitle: '',
        pathname: '',
      };
    }

    const contentElement = document.querySelector(contentSelector);

    const pathname = window.location.pathname;

    // The DOM resolves links against the current origin, which is localhost in
    // dev and the proxy host behind a tunnel. Copied Markdown should always
    // cite the canonical site.
    const siteOrigin = (siteConfig.url || window.location.origin).replace(
      /\/$/,
      ''
    );

    const pageUrl = `${siteOrigin}${pathname}`;

    const headingElement = contentElement?.querySelector('h1');

    const pageTitle = (
      headingElement?.textContent ||
      document.title ||
      ''
    ).trim();

    let markdown = htmlToMarkdown(contentElement, converterOverrides)
      .split(window.location.origin)
      .join(siteOrigin);

    if (markdown && includeSource) {
      markdown = `${markdown}\n\n${buildSourceNote({ pageUrl, pageTitle })}`;
    }

    return {
      markdown,
      pageUrl,
      markdownUrl: toMarkdownUrl(pathname),
      pageTitle,
      pathname,
    };
  }, [
    contentSelector,
    converterOverrides,
    includeSource,
    buildSourceNote,
    siteConfig.url,
  ]);

  const getMarkdown = useCallback(() => {
    return getPage().markdown;
  }, [getPage]);

  const getMarkdownUrl = useCallback(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return toMarkdownUrl(window.location.pathname);
  }, []);

  const copyMarkdown = useCallback(async () => {
    const { markdown } = getPage();

    const copied = await copyTextToClipboard(markdown);

    flashCopyStatus(copied ? 'copied' : 'error');

    return copied;
  }, [getPage, flashCopyStatus]);

  // Opens the file from the markdown-pages plugin, so the URL is shareable.
  // Only exists in a built site; `postBuild` never runs under `npm start`.
  const openMarkdown = useCallback(() => {
    const markdownUrl = getMarkdownUrl();

    if (!markdownUrl) {
      return;
    }

    window.open(markdownUrl, '_blank', 'noopener');
  }, [getMarkdownUrl]);

  /**
   * @param {{ buildUrl: (prompt: string) => string }} target
   * @param {(page: { pageUrl: string, markdownUrl: string, pageTitle: string, markdown: string }) => string} buildPrompt
   */
  const openInAssistant = useCallback(
    (target, buildPrompt) => {
      const { markdown, pageUrl, markdownUrl, pageTitle } = getPage();

      const prompt = buildPrompt({ pageUrl, markdownUrl, pageTitle, markdown });

      window.open(target.buildUrl(prompt), '_blank', 'noopener');
    },
    [getPage]
  );

  return {
    copyStatus,
    getPage,
    getMarkdown,
    getMarkdownUrl,
    copyMarkdown,
    openMarkdown,
    openInAssistant,
  };
}

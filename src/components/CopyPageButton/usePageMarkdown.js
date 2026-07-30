import { useCallback, useEffect, useRef, useState } from 'react';

import { htmlToMarkdown } from './htmlToMarkdown';
import { copyTextToClipboard } from './clipboard';
import {
  DEFAULT_CONTENT_SELECTOR,
  DEFAULT_STATUS_RESET_MS,
  defaultBuildSourceNote,
} from './config';

/**
 * Headless layer: reads the rendered doc content, converts it to Markdown, and
 * exposes the actions for it. Renders nothing, so any UI can sit on top (button,
 * keyboard shortcut, navbar item). {@link CopyPageButton} is one consumer.
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
  // 'idle' | 'copied' | 'error', so the UI can report a blocked clipboard.
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

  // Read at call time, not render time: the content element is browser-only and
  // changes as the reader opens tabs and collapsible sections.
  const getPage = useCallback(() => {
    if (typeof document === 'undefined') {
      return { markdown: '', pageUrl: '', pageTitle: '', pathname: '' };
    }

    const contentElement = document.querySelector(contentSelector);

    const pageUrl = window.location.href;

    const pathname = window.location.pathname;

    const headingElement = contentElement?.querySelector('h1');

    const pageTitle = (
      headingElement?.textContent ||
      document.title ||
      ''
    ).trim();

    let markdown = htmlToMarkdown(contentElement, converterOverrides);

    if (markdown && includeSource) {
      markdown = `${markdown}\n\n${buildSourceNote({ pageUrl, pageTitle })}`;
    }

    return { markdown, pageUrl, pageTitle, pathname };
  }, [contentSelector, converterOverrides, includeSource, buildSourceNote]);

  const getMarkdown = useCallback(() => {
    return getPage().markdown;
  }, [getPage]);

  const copyMarkdown = useCallback(async () => {
    const { markdown } = getPage();

    const copied = await copyTextToClipboard(markdown);

    flashCopyStatus(copied ? 'copied' : 'error');

    return copied;
  }, [getPage, flashCopyStatus]);

  // text/plain, not text/markdown: browsers download the latter instead of
  // rendering it, and "View" should show the text in a tab.
  const openMarkdown = useCallback(() => {
    const { markdown } = getPage();

    if (!markdown) {
      return;
    }

    const blob = new Blob([markdown], { type: 'text/plain;charset=utf-8' });

    const objectUrl = URL.createObjectURL(blob);

    window.open(objectUrl, '_blank', 'noopener');

    // The tab has loaded the blob by now; revoke so it does not leak for the
    // whole session.
    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 60000);
  }, [getPage]);

  /**
   * Open an AI assistant with a prompt built from the current page.
   * @param {{ buildUrl: (prompt: string) => string }} target
   * @param {(page: { pageUrl: string, pageTitle: string, markdown: string }) => string} buildPrompt
   */
  const openInAssistant = useCallback(
    (target, buildPrompt) => {
      const { markdown, pageUrl, pageTitle } = getPage();

      const prompt = buildPrompt({ pageUrl, pageTitle, markdown });

      window.open(target.buildUrl(prompt), '_blank', 'noopener');
    },
    [getPage]
  );

  return {
    copyStatus,
    getPage,
    getMarkdown,
    copyMarkdown,
    openMarkdown,
    openInAssistant,
  };
}

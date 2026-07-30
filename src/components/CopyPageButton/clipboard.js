/**
 * Clipboard helper for the "Copy page" feature.
 *
 * `navigator.clipboard` is unavailable in insecure contexts (plain http, some
 * embedded webviews), so fall back to a hidden textarea plus `execCommand`.
 */

function copyWithTextarea(text) {
  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-1000px';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);

  textarea.select();

  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * Copy text to the clipboard.
 * @param {string} text
 * @returns {Promise<boolean>} whether the copy succeeded
 */
export async function copyTextToClipboard(text) {
  if (!text || typeof document === 'undefined') {
    return false;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);

      return true;
    } catch {
      // Permission denied or insecure context: try the legacy path below.
    }
  }

  return copyWithTextarea(text);
}

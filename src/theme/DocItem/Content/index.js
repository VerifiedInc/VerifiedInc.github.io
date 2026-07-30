import React from 'react';
import Content from '@theme-original/DocItem/Content';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import CopyPageButton from '@site/src/components/CopyPageButton';
import { DEFAULT_PLACEMENT } from '@site/src/components/CopyPageButton/config';

/**
 * Mounts the "Copy page" button on every doc page, above the content. SSR-safe:
 * the button only touches the DOM on click.
 *
 * Settings layer, most specific wins: `customFields.copyPage` in
 * `docusaurus.config.js`, then the page's `copy_page` front matter (`false` to
 * hide, or an object of any YAML-expressible CopyPageButton prop).
 * See src/components/CopyPageButton/README.md.
 */

// `useDoc` throws outside a doc page (another theme reusing Content), so degrade
// to no front matter. Always called, so hook order stays stable.
function useDocFrontMatter() {
  try {
    return useDoc().frontMatter || {};
  } catch {
    return {};
  }
}

function resolveSettings(siteSettings, pageSettings) {
  if (pageSettings === false) {
    return { enabled: false };
  }

  const pageOverrides =
    pageSettings === true || pageSettings === undefined ? {} : pageSettings;

  return { enabled: true, ...siteSettings, ...pageOverrides };
}

export default function ContentWrapper(props) {
  const { siteConfig } = useDocusaurusContext();

  const frontMatter = useDocFrontMatter();

  const {
    enabled,
    placement = DEFAULT_PLACEMENT,
    ...buttonProps
  } = resolveSettings(siteConfig.customFields?.copyPage, frontMatter.copy_page);

  if (!enabled) {
    return <Content {...props} />;
  }

  const button = (
    <CopyPageButton
      {...buttonProps}
      sx={placement === 'bottom' ? { mt: 2, mb: 0 } : undefined}
    />
  );

  return (
    <>
      {placement === 'top' && button}
      <Content {...props} />
      {placement === 'bottom' && button}
    </>
  );
}

import React from 'react';
import Content from '@theme-original/DocItem/Content';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import CopyPageButton from '@site/src/components/CopyPageButton';
import { DEFAULT_PLACEMENT } from '@site/src/components/CopyPageButton/config';

// Renders the "Copy page" button above every doc page. Settings come from
// `customFields.copyPage`, overridden per page by `copy_page` front matter
// (`false`, or an object of CopyPageButton props). See the component README.

// `useDoc` throws outside a doc page. Called unconditionally, so hook order holds.
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

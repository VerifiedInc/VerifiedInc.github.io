const fs = require('fs')
const path = require('path')
const hiddenFiles = fs.readdirSync(path.join(__dirname, 'docs/hidden')).map(file => file.replace('.mdx', ''))

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Verified Inc. Docs',
  tagline: 'Documentation for the Verified Inc. platform.',
  url: 'https://docs.verified.inc',
  baseUrl: '',
  /* revert to throw when possible, was unable to fix a broken link issue */
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'VerifiedInc', // Usually your GitHub org/user name.
  projectName: 'VerifiedInc.github.io', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['swift', 'kotlin', 'java', 'dart', 'groovy'],
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Verified Inc. Logo',
        src:  'img/logo.png',
        srcDark: 'img/logo_dark.png',
      },
      items: [
        {
          to: 'https://www.verified.inc',
          activeBasePath: '/',
          label: 'Home',
          position: 'right',
        },
        {
          to: 'https://github.com/VerifiedInc',
          activeBasePath: 'github',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Solutions',
          items: [
            {
              label: '1-Click Signup',
              to: '/',
            },
            {
              label: 'Issue to Earn',
              to: '/issue-to-earn',
            },
          ],
        },
        {
          title: 'Demos',
          items: [
            {
              label: '1-Click Signup',
              to: '/demo-1-click-signup',
            },
          ],
        },
        {
          title: 'API',
          items: [
            {
              label: 'Reference',
              to: '/api-reference',
            },
            {
              label: 'Postman',
              href: 'https://api.docs.verified.inc/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Terminology',
              to: '/terminology',
            },
            {
              label: 'Data Schemas',
              to: '/data-schemas',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Home',
              href: 'https://www.verified.inc',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/VerifiedInc',
            },
            {
              label: 'Email Support',
              href: 'mailto:Support@Verified.Inc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Verified Inc.`,
    },
    mermaid: {
      options: {
        // TODO: I can't seem to get global styling to work
      },
    },
    mermaid: {
      options: {
        // TODO: I can't seem to get global styling to work
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // This plugin isn't working with Docusaurus v3 yet
  /*
  plugins: [
    [
      'docusaurus-plugin-openapi-docs', // See https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/tree/main
      {
        id: "api", // plugin id
        docsPluginId: "classic", // id of plugin-content-docs or preset for rendering docs
        config: {
          api: { // the <id> referenced when running CLI commands
            specPath: "api/specs/api.json", // path to OpenAPI spec, URLs supported
            outputDir: "docs/api", // output directory for generated files
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
            },
          },
        }
      },
    ]
  ],
  */
  themes: [
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-mermaid',
    // 'docusaurus-theme-openapi-docs',
  ],
  markdown: {
    mermaid: true,
  },
  plugins: [[require.resolve('docusaurus-lunr-search'), {
    excludeRoutes: hiddenFiles,
    indexBaseUrl: true
  }]],
};

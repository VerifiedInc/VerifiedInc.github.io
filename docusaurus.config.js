/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Verified Inc. Docs',
  tagline: 'Documentation for the Verified Inc. platform.',
  url: 'https://docs.verified.inc',
  baseUrl: '/1-click-signup',
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
          title: 'Introduction',
          items: [
            {
              label: 'About Verified Inc.',
              to: '/',
            },
            {
              label: 'Terminology',
              to: '/terminology',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'Acceptance Guide',
              to: '/acceptance-guide',
            },
            {
              label: 'Issuance Guide',
              to: '/issuance-guide',
            },
            {
              label: '1-Click or Fee IDV',
              to: '/1-click-or-free-use-case',
            },
          ],
        },
        {
          title: 'Demos',
          items: [
            {
              label: 'Hooli Demo',
              to: '/hooli-demo',
            },
            {
              label: 'Kredita Demo',
              to: '/kredita-demo'
            },
            {
              label: 'Hooli Partner Demo',
              to: '/hooli-partner-demo',
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Verified Inc., Inc.`,
    },
    mermaid: {
      options: {
        fontFamily: 'Lato',
        themeVariables: {
          // TODO: This isn't working — not sure why. Other themeVariables are working
          primaryColor: '#0dbc3d',
        },
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
};

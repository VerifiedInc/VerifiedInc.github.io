const fs = require('fs')
const path = require('path')
// Commenting out for now because removing hidden directory
// const hiddenFiles = fs.readdirSync(path.join(__dirname, 'docs/hidden')).map(file => file.replace('.mdx', ''))

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Verified Docs',
  tagline: 'Documentation for the Verified platform',
  url: 'https://docs.verified.inc',
  baseUrl: '',
  /* change to 'warn' if unable to fix broken link issue */
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
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
        alt: 'Verified Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo_dark.png',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
        },
        {
          to: 'https://dashboard.verified.inc',
          label: 'Dashboard',
          position: 'left',
        },
        {
          to: 'https://1-click.demo.verified.inc',
          label: 'Demo',
          position: 'left',
        },
        {
          to: 'https://www.verified.inc',
          label: 'Website',
          position: 'right',
        },
        {
          to: 'https://github.com/VerifiedInc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '1-Click Signup',
          items: [
            {
              label: 'Overview',
              to: '/v2/overview',
            },
            {
              label: 'Quick Start Guide',
              to: '/v2/quick-start-guide',
            },
            {
              label: 'Integration Guide',
              to: '/v2/integration-guide',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
                label: 'Authentication',
                to: '/v2/authentication',
            },
            {
              label: 'Environments',
              to: '/v2/environments',
            },
            {
              label: 'Endpoints',
              to: '/v2/endpoints',
            },
            {
              label: 'Types',
              to: '/v2/types',
            },
          ],
        },
        {
          title: 'Tools',
          items: [
            {
              label: 'Dashboard',
              to: 'https://dashboard.verified.inc',
            },
            {
              label: 'Demo',
              to: 'https://1-click.demo.verified.inc',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              to: 'https://www.verified.inc',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/VerifiedInc',
            },
            {
              label: 'Support',
              to: 'mailto:Support@Verified.inc',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Verified`,
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
          sidebarCollapsible: false,
          routeBasePath: '/',
          includeCurrentVersion: false,
          lastVersion: '1',
          breadcrumbs: true,
          versions: {
            '1': {
              label: 'v1',
              badge: false,
              path: '/'
            },
            '2': {
              label: 'v2',
              badge: false,
              path: '/v2'
            },
          },
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
  scripts: [
    {
      src: '/scripts/brandSettings.js',
      defer: true,
    }
  ],
  themes: [
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-mermaid',
    // 'docusaurus-theme-openapi-docs',
  ],
  markdown: {
    mermaid: true,
  },
  plugins: [[require.resolve('docusaurus-lunr-search'), {
    // options, ref: https://github.com/praveenn77/docusaurus-lunr-search#options-available
    // Commenting out for now because removing hidden directory
    // excludeRoutes: hiddenFiles,
    indexBaseUrl: true
  }]],
};

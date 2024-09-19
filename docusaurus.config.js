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
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'VerifiedInc', // Usually your GitHub org/user name.
  projectName: 'VerifiedInc.github.io', // Usually your repo name.
  themeConfig: {
    announcementBar: {
      content: '<b>1-Click Signup v2 is live!</b> It\'s over <i>3x faster</i> than v1',
      backgroundColor: '#0dbc3d',
      textColor: '#ffffff',
    },
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
              to: '/overview',
            },
            {
              label: 'Quick Start Guide',
              to: '/quick-start-guide',
            },
            {
              label: 'Integration Guide',
              to: '/integration-guide',
            },
            {
              label: 'Migration Guide (v1 to v2)',
              to: '/migration-guide',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
                label: 'Authentication',
                to: '/authentication',
            },
            {
              label: 'Environments',
              to: '/environments',
            },
            {
              label: 'Endpoints',
              to: '/endpoints',
            },
            {
              label: 'Types',
              to: '/types',
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
          lastVersion: '2',
          breadcrumbs: true,
          versions: {
            '1': {
              label: 'v1',
              badge: false,
              path: '/v1'
            },
            '2': {
              label: 'v2',
              badge: false,
              path: '/'
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('docusaurus-lunr-search'), 
      {
        // options, ref: https://github.com/praveenn77/docusaurus-lunr-search#options-available
        // Commenting out for now because removing hidden directory
        // excludeRoutes: hiddenFiles,
        indexBaseUrl: true
      }
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Explicitly handling page redirects for v1 because the more sophisticated approach below isn't working
        redirects: [
          // /X -> /v1/X
          {
            to: '/v1/issue-to-earn',
            from: '/issue-to-earn',
          },
          {
            to: '/v1/demo-1-click-signup',
            from: '/demo-1-click-signup',
          },
          {
            to: '/v1/demo-issue-to-earn',
            from: '/demo-issue-to-earn',
          },
          {
            to: '/v1/api-reference',
            from: '/api-reference',
          },
          {
            to: '/v1/schema',
            from: '/schema',
          },
        ],
        // This isn't working — not sure why
        // createRedirects(existingPath) {
        //   if (existingPath.includes('/v2')) {
        //     // Redirect from /v2/X to /X (see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects#CreateRedirectsFn)
        //     return [
        //       existingPath.replace('/v2', '/'),
        //     ];
        //   }
        //   return undefined; // Return a falsy value: no redirect created
        // },
      },
    ],
    // This plugin isn't working with Docusaurus v3 yet
    // [
    //   'docusaurus-plugin-openapi-docs', // See https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/tree/main
    //   {
    //     id: "api", // plugin id
    //     docsPluginId: "classic", // id of plugin-content-docs or preset for rendering docs
    //     config: {
    //       api: { // the <id> referenced when running CLI commands
    //         specPath: "api/specs/api.json", // path to OpenAPI spec, URLs supported
    //         outputDir: "docs/api", // output directory for generated files
    //         sidebarOptions: { // optional, instructs plugin to generate sidebar.js
    //           groupPathsBy: "tag", // group sidebar items by operation "tag"
    //         },
    //       },
    //     }
    //   },
    // ]
  ],
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
};

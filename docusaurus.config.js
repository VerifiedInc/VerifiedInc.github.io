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
    announcementBar: {
      content: '<b>The new 1-Click Signup SDK is live!</b> It\'s <i>10x faster</i> to integrate than the API',
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
          type: 'custom-navbarButton',
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
              label: 'Custom Demo',
              to: '/custom-demo',
            },
            {
              label: 'Test Users',
              to: '/test-users',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'User Experience',
              to: '/guides/user-experience',
            },
            {
              label: 'Setup',
              to: '/guides/setup',
            },
            {
              label: 'SDK Integration',
              to: '/guides/sdk-integration',
            },
            {
              label: 'API Integration',
              to: '/guides/api-integration',
            },
          ],
        },
        {
          title: 'Data',
          items: [
            {
              label: 'Identifiers',
              to: '/data/inputs/identifiers',
            },
            {
              label: 'Credentials',
              to: '/data/outputs/credentials',
            },
            {
              label: 'Metadata',
              to: '/data/outputs/metadata',
            },
          ],
        },
        {
          title: 'SDK Reference',
          items: [
            {
              label: 'Installation',
              to: '/sdk-reference/installation',
            },
            {
              label: 'Constants',
              to: '/sdk-reference/constants',
            },
            {
              label: 'Methods',
              to: '/sdk-reference/methods',
            },
            {
              label: 'Types',
              to: '/sdk-reference/types',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
                label: 'Authentication',
                to: '/api-reference/authentication',
            },
            {
              label: 'Environments',
              to: '/api-reference/environments',
            },
            {
              label: 'Endpoints',
              to: '/api-reference/endpoints',
            },
            {
              label: 'Errors',
              to: '/api-reference/errors',
            },
            {
              label: 'Types',
              to: '/api-reference/types',
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
      copyright: `Copyright © ${new Date().getFullYear()} Verified Network Inc. All rights reserved.`,
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
        // Already a dependency of @docusaurus/preset-classic, and don't need to install this plugin as a dependency.
        gtag: {
          // The tracking ID of your gtag service. It is possible to provide multiple ids.
          trackingID: 'G-XLFB0MY99N',
          // Whether the IP should be anonymized when sending requests.
          // anonymizeIP: true,
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          routeBasePath: '/',
          includeCurrentVersion: false,
          lastVersion: '2.1',
          breadcrumbs: true,
          versions: {
            // Hiding because we no longer want to show v1 Docs
            // '1.0': {
            //   label: 'v1.0',
            //   badge: false,
            //   path: '/v1.0'
            // },
            '2.0': {
              label: 'v2.0',
              badge: false,
              banner: 'none',
              path: '/v2.0'
            },
            '2.1': {
              label: 'v2.1',
              badge: false,
              banner: 'none',
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
    // [
      // Disabling for now. There's a bug with Lunr (it seems) that's preventing excludeRoutes and includeRoutes from working. We don't want people inadvertently switching versions by searching.
      // require.resolve('docusaurus-lunr-search'),
      // {
        // options, ref: https://github.com/praveenn77/docusaurus-lunr-search#options-available
        // indexBaseUrl: true
        // NOT WORKING: not sure why
        // Exclude v2.0 to avoid people accidentally switching versions
        // excludeRoutes: [
        //   'versioned_docs/version-2.1/reusables', 
        //   'versioned_docs/version-2.0'
        // ],
        // includeRoutes: ['versioned_docs/version-2.1/**'],
      // }
    // ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Explicitly handling page redirects for v2.0 because the more sophisticated approach below isn't working
        redirects: [
          // /X -> /v2.0/X
          {
            to: '/v2.0/recommended-ux',
            from: '/recommended-ux',
          },
          {
            to: '/v2.0/quick-start-guide',
            from: '/quick-start-guide',
          },
          {
            to: '/v2.0/integration-guide',
            from: '/integration-guide',
          },
          {
            to: '/v2.0/migration-guide-v1-to-v2',
            from: '/migration-guide-v1-to-v2',
          },
          {
            to: '/v2.0/example-app',
            from: '/example-app',
          },
          {
            to: '/v2.0/demo',
            from: '/demo',
          },
          {
            to: '/v2.0/authentication',
            from: '/authentication',
          },
          {
            to: '/v2.0/environments',
            from: '/environments',
          },
          {
            to: '/v2.0/test-users',
            from: '/test-users',
          },
          {
            to: '/v2.0/endpoints',
            from: '/endpoints',
          },
          {
            to: '/v2.0/errors',
            from: '/errors',
          },
          {
            to: '/v2.0/types',
            from: '/types',
          },
          {
            to: '/v2.0/data',
            from: '/data',
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

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
      content: 'Announcing <b><a href="/text-to-signup">Text to Signup!</a></b> A marketing <i>superpower</i>',
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
          to: 'https://verified.inc',
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
          label: 'Stack Overflow',
          href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        },
        {
          label: 'Discord',
          href: 'https://discordapp.com/invite/docusaurus',
        },
        {
          label: 'X',
          href: 'https://x.com/docusaurus',
        },
        {
          html: `
              <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" width="114" height="51" />
              </a>
            `,
        },
      ],
      links: [
        {
          title: '1-Click Signup',
          items: [
            {
              label: 'Overview',
              to: '/1-click-signup/overview',
            },
            {
              label: 'User Experience',
              to: '/1-click-signup/user-experience',
            },
            {
              label: 'Test Users',
              to: '/1-click-signup/test-users',
            },
            {
              label: 'Guides',
              to: '/1-click-signup/guides',
            },
          ],
        },
        {
          title: 'Text to Signup',
          items: [
            {
              label: 'Overview',
              to: '/text-to-signup/overview',
            },
            {
              label: 'User Experience',
              to: '/text-to-signup/user-experience',
            },
            {
              label: 'Guide',
              to: '/text-to-signup/guide',
            },
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: 'Data',
              to: '/reference/data',
            },
            {
              label: 'SDK',
              to: '/reference/sdk',
            },
            {
              label: 'API',
              to: '/reference/api',
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
              to: 'https://verified.inc',
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
          // For Text to Signup revamp
          // /X -> /1-click-signup/X
          {
            to: '/1-click-signup/overview',
            from: '/overview',
          },
          {
            to: '/1-click-signup/test-users',
            from: '/test-users',
          },
          {
            to: '/1-click-signup/guides',
            from: '/guides',
          },
          {
            to: '/1-click-signup/user-experience',
            from: '/guides/user-experience',
          },
          {
            to: '/1-click-signup/guides/setup',
            from: '/guides/setup',
          },
          {
            to: '/1-click-signup/guides/sdk-integration',
            from: '/guides/sdk-integration',
          },
          {
            to: '/1-click-signup/guides/api-integration',
            from: '/guides/api-integration',
          },
          {
            to: '/reference/data',
            from: '/data',
          },
          {
            to: '/reference/data/inputs',
            from: '/data/inputs',
          },
          {
            to: '/reference/data/inputs/identifiers',
            from: '/data/inputs/identifiers',
          },
          {
            to: '/reference/data/outputs',
            from: '/data/outputs',
          },
          {
            to: '/reference/data/outputs/credentials',
            from: '/data/outputs/credentials',
          },
          {
            to: '/reference/data/outputs/metadata',
            from: '/data/outputs/metadata',
          },
          {
            to: '/reference/sdk',
            from: '/sdk-reference',
          },
          {
            to: '/reference/sdk/installation',
            from: '/sdk-reference/installation',
          },
          {
            to: '/reference/sdk/constants',
            from: '/sdk-reference/constants',
          },
          {
            to: '/reference/sdk/methods',
            from: '/sdk-reference/methods',
          },
          {
            to: '/reference/sdk/types',
            from: '/sdk-reference/types',
          },
          {
            to: '/reference/api',
            from: '/api-reference',
          },
          {
            to: '/reference/api/authentication',
            from: '/api-reference/authentication',
          },
          {
            to: '/reference/api/environments',
            from: '/api-reference/environments',
          },
          {
            to: '/reference/api/endpoints',
            from: '/api-reference/endpoints',
          },
          {
            to: '/reference/api/errors',
            from: '/api-reference/errors',
          },
          {
            to: '/reference/api/types',
            from: '/api-reference/types',
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

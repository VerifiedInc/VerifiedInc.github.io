/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Unum ID Docs',
  tagline: 'Documentation for the Unum ID platform.',
  url: 'https://docs.unum.id',
  baseUrl: '/',
  /* revert to throw when possible, was unable to fix a broken link issue */
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'UnumID', // Usually your GitHub org/user name.
  projectName: 'UnumID.github.io', // Usually your repo name.
  themeConfig: {
    prism: {
      additionalLanguages: ['swift', 'kotlin', 'java'],
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Unum ID Logo',
        src:  'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          to: 'https://www.Unum.ID',
          activeBasePath: '/',
          label: 'Home',
          position: 'right',
        },
        {
          to: 'https://github.com/UnumID',
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
          title: 'Docs',
          items: [
            {
              label: 'Usage Guide',
              to: '/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Home',
              href: 'https://www.Unum.ID',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/UnumID',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Unum ID, Inc.`,
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
  themes: [
    '@docusaurus/theme-live-codeblock',
  ],
};

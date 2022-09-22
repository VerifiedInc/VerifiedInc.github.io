module.exports = {
  sidebar: [
    // {
    //   type: 'doc',
    //   id: 'quick-start-guide',
    // },
    // {
    //   type: 'doc',
    //   id: 'usage-guide',
    // },
    {
      type: 'category',
      label: 'Introduction',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        'about-unum-id',
        'terminology',
        'architecture',
        'deployment-overview',
        'privacy-and-security',
        'schema',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        'quick-start-guide',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        'server-sdk',
        {
          type: 'category',
          label: 'Mobile SDK',
          /* should change when we have lots of docs */
          collapsed: false,
          items: [
            'mobile-sdk-overview',
            'mobile-sdk-android',
            'mobile-webwallet-sdk-android',
            'mobile-sdk-ios',
            'mobile-webwallet-sdk-ios',
            'mobile-sdk-flutter',
          ],
        },
        {
          type: 'category',
          label: 'Web SDK',
          collapsed: false,
          items: [
            'web-sdk-overview',
            'web-sdk-react'
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Demos',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        'developer-demo',
        'idv-demo',
        'acme-demo',
        'hooli-demo',
      ]
    },
  ],
};

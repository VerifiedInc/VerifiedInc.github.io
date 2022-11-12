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
      /* should collapse when we have lots of docs */
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
      /* should collapse when we have lots of docs */
      collapsed: false,
      items: [
        'quick-start-guide',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      /* should collapse when we have lots of docs */
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Backend',
          /* should collapse when we have lots of docs */
          collapsed: true,
          items: [
            'server-sdk-overview',
            'verifier-service',
            'server-sdk',
          ],
        },
        {
          type: 'category',
          label: 'Mobile SDK',
          /* should collapse when we have lots of docs */
          collapsed: true,
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
          collapsed: true,
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

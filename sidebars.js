module.exports = {
  sidebar: [
    {
      type: 'doc',
      id: 'about-unum-id',
    },
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
        // '1-click-or-free-use-case',
        'terminology',
        'faq-info',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      /* should collapse when we have lots of docs */
      collapsed: false,
      items: [
        '1-click-or-free-use-case',
        'issuance-guide'
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      /* should collapse when we have lots of docs */
      collapsed: false,
      items: [
        '1-click-or-free-use-case',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      /* should collapse when we have lots of docs */
      collapsed: false,
      items: [
        'api-overview',
        'schema',
        // {
        //   type: 'category',
        //   label: 'Backend',
        //   /* should collapse when we have lots of docs */
        //   collapsed: true,
        //   items: [
        //     'backend-overview',
        //     'issuer-service',
        //     'verifier-service',
        //     'server-sdk',
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Mobile SDKs',
        //   /* should collapse when we have lots of docs */
        //   collapsed: true,
        //   items: [
        //     // 'mobile-sdk-overview',
        //     // 'mobile-sdk-android',
        //     'mobile-webwallet-sdk-android',
        //     // 'mobile-sdk-ios',
        //     'mobile-webwallet-sdk-ios',
        //     // 'mobile-sdk-flutter',
        //     'mobile-webwallet-sdk-flutter',
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Web SDK',
        //   collapsed: true,
        //   items: [
        //     'web-sdk-overview',
        //     'web-sdk-react'
        //   ]
        // }
      ],
    },
    {
      type: 'category',
      label: 'Demos',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        // 'idv-demo',
        'hooli-demo',
        'kredita-demo'
      ]
    },
  ],
};

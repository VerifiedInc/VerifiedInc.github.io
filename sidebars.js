module.exports = {
  sidebar: [
    {
      type: 'doc',
      id: 'usage-guide',
    },
    {
      type: 'category',
      label: 'Introduction',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        'about-unum-id',
        'terminology',
        'deployment',
        'security',
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
            'mobile-sdk-android', 
            'mobile-sdk-ios',
            'reference-mobile-apps',
          ],
        },
        'web-sdk',
      ],
    },
    {
      type: 'category',
      label: 'Demos',
      /* should change when we have lots of docs */
      collapsed: false,
      items: [
        'developer-demo',
        'acme-demo',
        'hooli-demo',
      ]
    },
  ],
};

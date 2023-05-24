module.exports = {
  sidebar: [
    {
      type: 'doc',
      id: 'about-unum-id',
    },
    {
      type: 'category',
      label: 'Introduction',
      /* should collapse when we have lots of docs */
      collapsed: false,
      items: [
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
        'acceptance-guide',
        'issuance-guide'
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

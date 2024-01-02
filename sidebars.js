module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Solutions',
      collapsed: false,
      items: [
        '1-click-signup',
        'issue-to-earn',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: [
        'terminology',
        {
          type: 'category',
          label: 'API',
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'api-overview',
            },
            {
              type: 'link',
              label: 'Postman Collection',
              href: 'https://api.docs.verified.inc/'
            },
          ],
        },
        'schema',
        'demos',
        'faq-info',
      ],
    },
  ],
};
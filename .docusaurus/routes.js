
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/markdown-page',
  component: ComponentCreator('/markdown-page','be1'),
  exact: true,
},
{
  path: '/',
  component: ComponentCreator('/','504'),
  
  routes: [
{
  path: '/',
  component: ComponentCreator('/','f60'),
  exact: true,
},
{
  path: '/about-unum-id',
  component: ComponentCreator('/about-unum-id','7e1'),
  exact: true,
},
{
  path: '/acme-demo',
  component: ComponentCreator('/acme-demo','409'),
  exact: true,
},
{
  path: '/deployment',
  component: ComponentCreator('/deployment','3b1'),
  exact: true,
},
{
  path: '/developer-demo',
  component: ComponentCreator('/developer-demo','37b'),
  exact: true,
},
{
  path: '/hooli-demo',
  component: ComponentCreator('/hooli-demo','12e'),
  exact: true,
},
{
  path: '/mobile-sdk-android',
  component: ComponentCreator('/mobile-sdk-android','d82'),
  exact: true,
},
{
  path: '/mobile-sdk-ios',
  component: ComponentCreator('/mobile-sdk-ios','f50'),
  exact: true,
},
{
  path: '/reference-mobile-apps',
  component: ComponentCreator('/reference-mobile-apps','e65'),
  exact: true,
},
{
  path: '/security',
  component: ComponentCreator('/security','320'),
  exact: true,
},
{
  path: '/server-sdk',
  component: ComponentCreator('/server-sdk','8b9'),
  exact: true,
},
{
  path: '/terminology',
  component: ComponentCreator('/terminology','e5a'),
  exact: true,
},
{
  path: '/web-sdk',
  component: ComponentCreator('/web-sdk','b2a'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];

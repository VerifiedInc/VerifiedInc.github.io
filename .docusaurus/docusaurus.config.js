export default {
  "title": "Unum ID Docs",
  "tagline": "Documentation for the Unum ID platform.",
  "url": "https://docs.unum.id",
  "baseUrl": "/",
  "onBrokenLinks": "warn",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.png",
  "organizationName": "UnumID",
  "projectName": "UnumID.github.io",
  "themeConfig": {
    "navbar": {
      "title": "Docs",
      "logo": {
        "alt": "Unum ID Logo",
        "src": "img/logo.svg",
        "srcDark": "img/logo_dark.svg"
      },
      "items": [
        {
          "to": "https://www.Unum.ID",
          "activeBasePath": "/",
          "label": "Home",
          "position": "right"
        },
        {
          "to": "https://github.com/UnumID",
          "activeBasePath": "github",
          "label": "GitHub",
          "position": "right"
        },
        {
          "to": "/",
          "activeBasePath": "api",
          "label": "API",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Usage Guide",
              "to": "/"
            }
          ]
        },
        {
          "title": "More",
          "items": [
            {
              "label": "Home",
              "href": "https://www.Unum.ID"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/UnumID"
            },
            {
              "label": "API",
              "href": "/"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2021 Unum ID, Inc."
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false,
    "liveCodeBlock": {
      "playgroundPosition": "bottom"
    }
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/raysmets/dev/UnumID.github.io/sidebars.js",
          "routeBasePath": "/"
        },
        "theme": {
          "customCss": "/Users/raysmets/dev/UnumID.github.io/src/css/custom.css"
        }
      }
    ]
  ],
  "themes": [
    "@docusaurus/theme-live-codeblock"
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "titleDelimiter": "|",
  "noIndex": false
};
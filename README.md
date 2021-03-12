(File hidden so it isn't published to GitHub Pages.)

# Docs

These docs are built using [Docusaurus](https://v2.docusaurus.io/docs/) (v2), deployed on GitHub Pages to [docs.unum.id](https://docs.unum.id/).

**Important:** Publishing to `master` will publish to docs.unum.id! Please don't publish any real documentation yet so we don't run into legal issues with IP protection.

## Docusaurus (v2)

**Note:** Make sure _not_ to use the v1 Docusaurus docs.

[Docusaurus](https://v2.docusaurus.io/docs/) is a Facebook open source project that makes creating documentation easy. The result is a React app displaying GitHub flavored Markdown. A basic usage guide is currently at [docs.unum.id](https://docs.unum.id/) showing some of the nice features like live code editors. Because it's React based, we may be able to leverage some of our existing demo content (written in React) right in the documentation itself, which would be cool.

### Installation

```console
yarn install
```

### Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## GitHub Pages

Every GitHub user and organization gets a free [GitHub Pages](https://pages.github.com/) page. Docusaurus offers this as a simple deployment and hosting option. The setup (which feels a little arbitrary!) is:

We have a repo named [organization].github.io (so in our case UnumID.github.io) and add this to `docusaurus.config.js`.
When we push to the `master` branch of that repo we deploy to GitHub pages.
When we push to the `gh-pages` branch of any other repo in the UnumID organization, we deploy to GitHub pages.

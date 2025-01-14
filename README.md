(File hidden so it isn't published to GitHub Pages.)

# Docs

These docs are built using [Docusaurus](https://v2.docusaurus.io/docs/) (v2), deployed on GitHub Pages to [docs.verified.inc](https://docs.verified.inc/).

**Important:** Publishing to `master` will publish to [docs.verified.inc](https://docs.verified.inc/)! Please don't publish any real documentation yet so we don't run into legal issues with IP protection.

## Docusaurus (v2)

**Note:** Make sure _not_ to use the v1 Docusaurus docs.

[Docusaurus](https://v2.docusaurus.io/docs/) is a Facebook open source project that makes creating documentation easy. The result is a React app displaying GitHub flavored Markdown. 

### Usage Guide
A basic usage guide is currently at [docs.verified.inc/usage-guide](https://docs.verified.inc/usage-guide) showing some of the nice features like live code editors. Because it's React based, we may be able to leverage some of our existing demo content (written in React) right in the documentation itself, which would be cool. 

The guide also includes examples on how to use custom React code within our `mdx` files, e.g. Tooltips.

### Custom Components
Custom React Components can be defined in `/src/components/` and leveraged throughout our `mdx` files. A current example of this is our Tip.jsx component for the tooltip functionality.

### Search

For Docusaurus [search](https://docusaurus.io/docs/search) functionality we are using a local indexing solution called [lunr](https://github.com/praveenn77/docusaurus-lunr-search#options-available).

### Installation
```console
npm install
```

#### Requirements
Node version 16.14+, latest minimum version can be found [here](https://docusaurus.io/docs/installation#requirements). We are self imposing a NPM version requirement of 8.19.2+ so the package-lock.json is not updated unnecessarily with individuals using older NPM versions. It is recommended to use NVM to install and use different Node and NPM versions. 

## Development

### Local

```console
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

You can use `build` script generate static content into the `build` directory and can be served using any static contents hosting service. However, for local development, we recommend just using the `start` command. The deployment job and infra manages builds.

### Branching Scheme

The main branch changes should be based off of is `main`. Previously we had to use `dev` as the main branch for various considerations. However, now that is no longer the case. This repo git flow is identical to all other repos in the organization. Like every other repo PRs ought be open against `main` and should be merged to `main`. Release version should be made off of `main` as well. Please see [deployments](#deployment) section below for more details.

### Deployment

Deployments are handled through a Github Action workflow that builds and deploys to Vercel.

#### Production

Using [this guide](https://vercel.com/guides/can-you-deploy-based-on-tags-releases-on-vercel), we are now using a Github Action job to trigger a Vercel production deployment off of release tags, `v.*.*.*`, from the `main` branch just like our other repos.

#### Preview

All pull requests create a preview deployment automatically thanks to the preview Github action job that triggers a Vercel preview deployment.

Vercel only triggers preview deployments by default if the vercel.json's `git.deploymentEnabled` was not set to `false`. We needed this config that way so that we could do our tag-based Production deployment process.


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

#### Custom Components
Custom React Components can be defined in `/src/components/` and leveraged throughout our `mdx` files. A current example of this is our Tip.jsx component for the tooltip functionality.

### Installation
```console
npm install
```

#### Requirements
Node version 16.14+, latest minimum version can be found [here](https://docusaurus.io/docs/installation#requirements). We are self imposing a NPM version requirement of 8.19.2+ so the package-lock.json is not updated unnecessarily with individuals using older NPM versions. It is recommended to use NVM to install and use different Node and NPM versions. 

### Local Development

```console
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

#### Vercel Method

Vercel does not use [trunk-based](https://circleci.com/blog/trunk-vs-feature-based-dev/) development workflow by default, instead defaulting to a feature-based strategy. While we could set it up to [trigger deployments based on tags](https://vercel.com/guides/can-you-deploy-based-on-tags-releases-on-vercel), it would require additional work to get the preview deployments working. So this reason, we are opting to move to feature-based developemnt / deployment strategy which unique in our org, just to this repo. To release to Production, one needs to merge `dev` branch into `main`. Ideally, still creating a tag on `dev` so we can continue to reference by version. 

#### Deprecated Github Pages Method

**Important:** Publishing to `master` will publish to [docs.verified.inc](https://docs.verified.inc/)! Please don't publish any documentation by pushing directly to `master`. If one wants to see the deployment they can run locally using `yarn start` or one can deploy to a different branch like `private` using:

```console
GIT_USER=<Your GitHub username> DEPLOYMENT_BRANCH=private USE_SSH=true yarn deploy
```

However, you should **not** deploy from your local machine. There is now a CI job using Github Actions which will auto deploy when a tag with a preceding `v` is pushed to any branch. By convention we have been using the `dev` branch as the source of truth. That said, `v` tags should really only be pushed to `dev` branch. This triggers a "build" version of the docs that is auto committed to the `master` branch.

It is also preferred if one could create an official Github release (also makes a tag) with a preceding `v` so that the Github Slack integration sends a message to the whole team letting them know that a docs release is happening. One can do this via the Github web UI or via the CLI with the `gh` [cli tool](https://cli.github.com/manual/gh_release_create), `gh release create <tag> [<files>...]`. For example, `gh release create v1.0.0 -n "Initial documentation release v1.0.0"`, will add the tag and release on the repo's main branch, `dev`, and trigger a release which is an automatic compiled commit from the Action CI job to the `master` branch. This GitHub actions configuration can be found in the [deploy.yaml](.github/workflows/deploy.yaml) file. 

**TL;DR never commit directly to master and create Github releases with preceding `v`, i.e. `v1.3.2`, only to `dev` branch.**

#### Preview Deployment

All pull requests create a preview deployment automatically thanks to use Vercel for deployment.

##### Tag

It may be the case that you would like to get other's approval or input prior to releasing the docs publicly via the deployment method above. While pulling this project from that branch in question and running locally is still probably the best way members of the business team, for example, can not do that. To handle this case, we have setup a "preview" deployment via Github Actions which is trigger with a git tag in the format `preview-v*.*.*`. This GitHub actions configuration can be found in the [preview.yaml](.github/workflows/preview.yaml) file. 

It publishes to the `preview` branch which should be consider akin to `master` and never pushed directly to. It would be recommend to push the preview tag from your feature branch. 

**Please only push preview tags, no need to create full blown Github releases for these previews**.

For example, if one would like feedback from the business team regarding changes on the `feat/guides` branch then push a `preview-v2.4.0` tag to that branch. This will trigger the preview deployment job which publishes to the `preview` branch. 

[Netlify](https://app.netlify.com/sites/resilient-capybara-2fa074/deploys) is being used for this deployment. Credentials via the shared devops@verified.inc email account can be found in 1Password. It deploys to the generic url, https://resilient-capybara-2fa074.netlify.app/. We very easily could deploy to a custom domain if we ever want to share "beta" docs with friendly parties.

### Search

For Docusaurus [search](https://docusaurus.io/docs/search) functionality we are using a local indexing solution called [lunr](https://github.com/praveenn77/docusaurus-lunr-search#options-available).

## GitHub Pages [Deprecated]

*No longer used for deployed. Now Vercel is the chosen deployment platform*

Every GitHub user and organization gets a free [GitHub Pages](https://pages.github.com/) page. Docusaurus offers this as a simple deployment and hosting option. The setup (which feels a little arbitrary!) is:

We have a repo named [organization].github.io (so in our case UnumID.github.io) and add this to `docusaurus.config.js`.
When we push to the `master` branch of that repo we deploy to GitHub pages.
When we push to the `gh-pages` branch of any other repo in the UnumID organization, we deploy to GitHub pages.

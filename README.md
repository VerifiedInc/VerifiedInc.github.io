(File hidden so it isn't published to GitHub Pages.)

# Docs

These docs are built using [Docusaurus](https://v2.docusaurus.io/docs/) (v2), deployed on GitHub Pages to [docs.unum.id](https://docs.unum.id/).

**Important:** Publishing to `master` will publish to [docs.unum.id](https://docs.unum.id/)! Please don't publish any real documentation yet so we don't run into legal issues with IP protection.

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

**Important:** Publishing to `master` will publish to [docs.unum.id](https://docs.unum.id/)! Please don't publish any real documentation yet, so deploy to a different branch like `private` using:

```console
GIT_USER=<Your GitHub username> DEPLOYMENT_BRANCH=private USE_SSH=true yarn deploy
```

If you don't include `DEPLOYMENT_BRANCH`, it defaults to master.

However, you should *not* deploy from your local machine. There is now a CI job using Github Actions which will auto deploy when a tag with a preceding `v` is pushed to any branch. By convention we have been using the `dev` branch as the source of truth. That said `v` tags ought to only be pushed to `dev` branch. This triggers a "build" version of the docs is auto committed to the `master` branch. Reiterating, no need to ever commit directly to master. 

It is also preferred if one could create an official Github release (also makes a tag) with a preceding `v` so that the Github Slack integration sends a message to the whole team letting them know that a docs release is happening. One can do this via the Github web UI or via the CLI with the `gh` [cli tool](https://cli.github.com/manual/gh_release_create), `gh release create <tag> [<files>...]`. For example, `gh release create v1.0.0 -n "Initial documentation release v1.0.0"`, will add the tag and release on the repo's main branch, `dev`, and trigger a release which is an automatic compiled commit from the Action CI job to the `master` branch.

## GitHub Pages

Every GitHub user and organization gets a free [GitHub Pages](https://pages.github.com/) page. Docusaurus offers this as a simple deployment and hosting option. The setup (which feels a little arbitrary!) is:

We have a repo named [organization].github.io (so in our case UnumID.github.io) and add this to `docusaurus.config.js`.
When we push to the `master` branch of that repo we deploy to GitHub pages.
When we push to the `gh-pages` branch of any other repo in the UnumID organization, we deploy to GitHub pages.

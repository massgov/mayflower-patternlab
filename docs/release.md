# Release to Production
Mayflower release managers with the necessary repo permissions can follow these steps to deploy code to production (i.e. do a release).

*Note: the following steps assume that your local machine and repository is already set up and functioning according to our [Getting Started docs](../.github/CONTRIBUTING.md#getting-started).*

1. If there is new code to be delivered, notify the team at least two hours ahead of time that a release is coming. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Upcoming Deployments.
1. Check out the [massgov/mayflower `dev` branch](https://github.com/massgov/mayflower/commits/dev): `git checkout dev` and pull the latest from upstream `git pull upstream dev`. (This assumes that your massgov/mayflower remote repo is named `upstream`)
1. Create a release branch `git checkout -b release-#.#.#` where `#.#.#` is the next version (i.e. `5.0.0`).  Read more about [Mayflower and semantic versioning](docs/versioning.md) to ensure that your are creating the right type of version.
1. Document the new release based on the "Upcoming" queue at the top of [release-notes.md](/release-notes.md), and then commit.
1. Move into the `stylguide` directory `cd styleguide` (may be a good idea to run `npm install` in case the release includes new packages).
1. Bump the version on the homepage - `@pages/readme2.json` - by updating the version and date text in `errorPage.type`
1. Bump the version of the npm package by running `gulp bump -v=#.#.#` where `#.#.#` is the version you are releasing.
1. Commit your version bump file updates.
1. Push release branch to `massgov/mayflower` (i.e. `git push upstream release-#.#.#`).
1. Wait for [the circle build](https://circleci.com/gh/massgov/mayflower) to pass, which will deploy your release branch to staging automagically :).
1. Verify release notes against the site rendered at: `https://mayflower.digital.mass.gov/<your-release-branch>/index.html`.
1. Smoke test Mayflower (a quick way to do this is to browse around to some of the different pages in the "pages" menu and do a quick gut check)
1. Open a Github Pull Request to merge (no squash!) the release branch into the `master` branch.
    1. Add the relevant release notes to the PR notes.
    1. This is a great time to verify one more time that your release [is following semantic versioning](versioning.md) properly (i.e. not pushing out breaking changes in a minor release).
1. [Create a production release](https://help.github.com/articles/creating-releases/) off the `master` branch in GitHub:
    1. Tag version: `#.#.#` (your release number)
    1. **@ Target: `master`** <<<<<<- important! :)
    1. Release title: `#.#.#` (your release number)
    1. Describe the release: paste your release notes markdown here, after the release version/date line, add a link to the release PR (protip: type `#` and you'll get an autocomplete dropdown to get to your pr)
1. Wait for [the circle builds](https://circleci.com/gh/massgov/mayflower) to pass
1. Pull down master `git pull upstream master`
1. Check out master `git checkout master`
1. Pull down your tag `git fetch --tags`
1. Make sure you are in `styleguide` (cd into `styleguide` if you're not)
1. Make sure you are have the necessary credentials for the s3 bucket and npm:
    1. In order to push to the mayflower s3 bucket, you need to have credentials set up in `<mayflower>/styleguide/tools/gulp/local.js` (you can copy `local.js.example` as a model).  Ask a team member for help with credentials.
    1. In order to push the Mayflower package to [NPM](https://npmjs.com/@massds/mayflower), you need to be authenticated on NPM, by one of the following:
        1. Having an `.npmrc` file with credentials for the `@massds` account (or your own NPM account if you're added to the Mayflower package as an owner) in the styleguide directory of your Mayflower repo (this file is not and should not be versioned -- ask a team member for credentials)
            - See [npmjs docs re: .npmrc](https://docs.npmjs.com/files/npmrc#per-project-config-file\n\n2)
        1. Having an `NPM_TOKEN` environment variable for `@massds`
            - See [npmjs docs re: NPM_TOKEN](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules)
        1. Authenticating from the npm CLI (Note: you must be added to the Mayflower NPM package project as an owner -- ask a team member for help)
            - See [npmjs docs](https://docs.npmjs.com/getting-started/publishing-npm-packages#preparation)
1. Deploy the release (to its three locations: prod `/`, current version `/<your-tag-name>/`, and latest minor `/<current-major-version>/`) and publish the [@massds/mayflower package on NPM](https://www.npmjs.com/package/@massds/mayflower) by running `../scripts/deploy-mayflower.sh -b <your-tag-name>` and follow the prompts.
1. Smoke test [Prod](http://mayflower.digital.mass.gov)
    - Make sure the home page reflects the date and version
1. Open a GitHub Pull Request to merge `master` into `develop` (this should only bring an updated `release-notes.md`, `@pages/readme2.json`). If a feature was reverted on the release branch, have a peer do the merge after a review.
1. In JIRA Go to the [DP project](https://jira.state.ma.us/projects/DP/).
    1. Click on the Releases icon on the left side (it looks like a boat/ship).
    1. Add a new release version with today's date.
    1. Go to each shipped JIRA issue and update the Fix Version/s field.
    1. Go to the list of issues contained within the release version and copy the URL (link to this issue from release notes).
1. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Deployment Completed to email Release Notes to the team.
1. Celebrate!!

## Rollback
In the event that a release needs to be rolled back from production, follow these steps:

1. Pull down and checkout the prior release tag and check it out by running `git pull --tags` then `git checkout <prior-release-tag>` (*Note: you should see a message from git that you are in a [detached head state](https://www.git-tower.com/learn/git/faq/detached-head-when-checkout-commit) and that is okay.*)
1. Make sure you are in `/styleguide` directory
1. Deploy prior release tag to:
    1. [Prod](http://mayflower.digital.mass.gov) by running `../scripts/deploy-prod-s3.sh -b <prior-release-tag>`
        1. When prompted, confirm your prod deployment by typing: `y`
    1. Latest minor by running `../scripts/deploy-latest-minor-s3.sh -b <prior-release-tag>`
        1. When prompted, confirm your latest minor deployment by typing: `y`
1. Validate rollback by browsing to [Prod](http://mayflower.digital.mass.gov) as well as `https://mayflower.digital.mass.gov/<current-major>/` and verifying that the home page reflects the correct version

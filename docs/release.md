# Release to Production
Mayflower release managers with the necessary repo permissions can follow these steps to deploy code to production (i.e. do a release).

*Note: this assumes that your local environment is already set up and functioning.  If this is not true, follow the steps in [Getting Started](../.github/CONTRIBUTING.md#getting-started).*

### Short Version

If you've done this before, here's a quick refresher:

1. Email: Notify the team of upcoming release
1. Checkout `dev`.
1. Create release branch.
1. Curate release "Updates" in release-notes.md, and then commit.
1. Bump version in front page pattern `readme2`.
1. Push release branch to `massgov/mayflower`.
1. Deploy release branch to your GH-Pages.
1. Verify release notes against the site rendered on your GH-Pages.
1. Smoke test most important stuff.
1. Merge (no squash!) GitHub PR: release --> master.
1. Cut release tag off Master (include release notes)
1. Deploy release tag to Prod (`massgov/mayflower` `gh-pages`).
1. Smoke test [Prod](http://mayflower.digital.mass.gov).
1. GitHub PR: master --> develop.
1. Set JIRA Fix Version for delivered tickets.
1. Email: Release notes.

### Long Version

First time or need more detail?  Read these:

1. If there is new code to be delivered, notify the team at least two hours ahead of time that a release is coming. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Upcoming Deployments.
1. Pull and checkout the [massgov/mayflower `dev` branch](https://github.com/massgov/mayflower/commits/dev): `git fetch upstream && git checkout dev`.
1. Create a release branch `git checkout -b release-#.#.#` where `#.#.#` is the next version (i.e. `5.0.0`).  Read more about Mayflower and semantic versioning in the docs (*@todo link to versioning docs*).
1. Document the new release based on the "Updates" queue at the top of release-notes.md, and then commit.
1. Bump the version in `@pages/readme2.json` by updating the version and date text in `errorPage.type`, and then commit.
1. Push release branch to `massgov/mayflower` (i.e. `git push upstream release-#.#.#`).
1. Deploy release branch to *your personal fork's* GH-Pages by running `./scripts/deploy-gh-pages.sh -b <your-release-branch-name> -t <your-github-username>` from the repo root.
1. Verify release notes against the site rendered on your GH-Pages: `<your-github-username>.github.io/mayflower`.
1. Smoke test most Mayflower featureset. (*@todo define Mayflower featureset*)
1. Open a Github Pull Request to merge the release branch into the `master` branch.  Have a peer do the merge unless it's an emergency and you can't find an available peer.
    1. Add the relevant release notes and a link to your gh-pages site to the PR notes.
    1. Have a peer do the merge (no squash!) unless it's an emergency and you can't find an available peer.
1. [Create a production release](https://help.github.com/articles/creating-releases/) off the `master` branch in GitHub, remember to add the release notes!
1. Pull down and checkout the your release tag by running `git pull --tags && git checkout <your-release-tag>` (*Note: you should see a message from git that you are in a [detached head state](https://www.git-tower.com/learn/git/faq/detached-head-when-checkout-commit) and that is okay.*)
1. Deploy release tag to [Prod](http://mayflower.digital.mass.gov) by running `./scripts/deploy-gh-pages.sh -b <your-release-tag> -t massgov -c mayflower.digital.mass.gov` from the repo root, where:
   - `-b` is the build source (*required*): your git branch or tag name.
   - `-t` is the target remote repo owner (*required*): `massgov` for prod.
   - `-c` is the custom cname (domain) for Prod (*required for prod deployment*): `mayflower.digital.mass.gov`
   1. When prompted, confirm your prod deployment by typing: `y`
1. Smoke test [Prod](http://mayflower.digital.mass.gov) 
    - Make sure the home page reflects the date and version
    - Ensure Mayflower featureset (*@todo define*) is functional
1. Open a GitHub Pull Request to merge `master` into `develop` (this should only bring an updated `release-notes.md`, `@pages/readme2.json`). Have a peer do the merge after a quick review. If no peers are available (such as during a late night hot fix), proceed with your merge into develop, but ask for a review the following day. If it doesn't pass review, you may have to rollback the delivery.
1. In JIRA Go to the [DP project](https://jira.state.ma.us/projects/DP/).
    1. Click on the Releases icon on the left side (it looks like a boat/ship).
    1. Add a new release version with today's date.
    1. Go to each shipped JIRA issue and update the Fix Version/s field.
    1. Go to the list of issues contained within the release version and copy the URL (link to this issue from release notes).
1. Follow the [Communicate Releases](https://wiki.state.ma.us/display/massgovredesign/Communicating+Releases) instructions for Deployment Completed to email Release Notes to the team.
1. Celebrate!!

## Rollback
In the event that a release needs to be rolled back from production, follow these steps:

1. Pull down and checkout the prior release tag and check it out by running `git pull --tags && git checkout <prior-release-tag>` (*Note: you should see a message from git that you are in a [detached head state](https://www.git-tower.com/learn/git/faq/detached-head-when-checkout-commit) and that is okay.*)
1. Deploy release tag to [Prod](http://mayflower.digital.mass.gov) by running `./scripts/deploy-gh-pages.sh -b <prior-release-tag> -t massgov -c mayflower.digital.mass.gov` from the repo root
   1. When prompted, confirm your prod deployment by typing: `y`
1. Validate rollback by browsing to [Prod](http://mayflower.digital.mass.gov) and verifying that the home page reflects the prior version


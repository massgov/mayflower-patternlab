# Deployment

On this page:

- [Developer deployment](#developer-deployment)
    - [Setting up your Fork with Github Pages](#setting-up-your-fork-with-github-pages)
- [Release deployment](#release-deployment)
- [Static assets](#static-assets)

## Developer deployment

#### Prerequisite

Set up your Mayflower fork + local repository, see our [CONTRIBUTING.md](../.github/CONTRIBUTING.md) for directions.

#### Deploy feature work to your fork's Github Pages for review and testing
Developers and contributors can follow these steps to deploy your branch to your fork's Github Pages environment.  This will allow reviewers to test your code without having to build from your branch locally.

1. Make sure your local repository is in a clean working state: `git status`.  If it's not, you can `git commit` or [stash](https://git-scm.com/book/en/v1/Git-Tools-Stashing) your local changes.
1. Make sure you have the thing you are deploying (branch or tag) pulled down locally.
1. Change directory to the root directory of your local repo (`mayflower`) if you're not already there.
1. Execute the deploy script by running `./scripts/deploy-gh-pages.sh -b <your-branch-or-tag-name> -t <your-github-username>`
    - Where `-b` is the build source (required): your git branch or tag name.
    - Where `-t` is the target remote repo owner (required): `<your-github-username>`.
    - For example, to deploy the branch `DP-1234-my-awesome-thing` to the mayflower forked repo `jesconstantine/mayflower`, use `./scripts/deploy-gh-pages.sh -b DP-1234-my-awesome-thing -t jesconstantine`.
    - **NOTE:** if you have a custom domain pointing to your `<github-username>.github.io`, you can pass `-c <your-custom-cname>` and `-a <path-to-assets-directory>` where `-c` is your cname (domain) and `-t` is the root relative path to the mayflower `assests/` directory (defaults to `mayflower/assets` for `<github-username>.github.io/mayflower` 
 1. If this is your first deployment, follow the steps below to set up your Mayflower fork with Github Pages.
    
### Setting up your Fork with Github Pages

This project uses [Github Pages](https://help.github.com/articles/what-is-github-pages/) as a static site hosting service.  Once you have followed the steps above to deploy your work to your Mayflower fork, you should see that your fork now has a `gh-pages` branch.  Follow these steps (necessary for the first deploy only) to configure your Mayflower fork to serve that static content from your `gh-pages` branch.

1. On Github, navigate to your Mayflower fork's repository.
1. Under your repository name, click the Settings tab.
1. From the Settings tab, scroll down to the Github Pages section.
1. Under Source, use the drop-down menu to select `gh-pages` as your Github Pages publishing source (you must have a `gh-pages` branch present for this option show).
1. Click Save.

You should now be able to see the work that you just deployed!  Just visit: 
```
http://<your-github-username>.github.io/mayflower
```

## Release deployment
Mayflower release managers with the necessary repo permissions can follow these steps to deploy a release to production.

**Release docs coming soon.**

## Static assets

It is possible to build Mayflower's static assets without serving them.  See the [gulp-readme](../styleguide/tools/gulp/gulp-readme.md) for more information.

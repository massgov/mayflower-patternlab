# Deployment

On this page:

- [Developer deployment](#developer-deployment)
    - [Setting up your Fork with Github Pages](#setting-up-your-fork-with-github-pages)
- [Release deployment](#release-deployment)
- [Static assets](#static-assets)

## Developer deployment
#### Deploy feature work to your fork's Github Pages for review and testing
Developers and contributors can follow these steps to deploy your branch to your fork's Github Pages environment.  This will allow reviewers to test your code without having to build from your branch locally.

1. Set up your Mayflower fork + local repository, see our [CONTRIBUTING.md](https://github.com/massgov/mayflower/blob/master/CONTRIBUTING.md) for directions.
1. Make sure your local repository is in a clean working state: `git status`.  If it's not, you can `git commit` or [stash](https://git-scm.com/book/en/v1/Git-Tools-Stashing) your local changes.
1. Make sure you have the thing you are deploying (branch or tag) pulled down locally
1. Change directory to the root directory of your local repo (likely `mayflower`).
1. Execute the deploy script by running `./scripts/deploy-gh-pages.sh -b your-branch-or-tag-name -t yourGithubUsername/mayflower`
    - Where `-b` is the build source (required): your git branch or tag name.
    - Where `-t` is the target remote repo (required): likely `<your github username>/mayflower`.  For example, the fork at [github.com/jesconstantine/mayflower](http://github.com/jesconstantine/mayflower) would use `jesconstantine/mayflower` 
    - For example, to deploy the branch `DP-1234-my-awesome-thing` to the mayflower forked repo `jesconstantine/mayflower`, use `./scripts/deploy-gh-pages.sh -b DP-1234-my-awesome-thing -t jesconstantine/mayflower`
 1. If this is your first deployment, follow the steps below to set up your Mayflower fork with Github Pages.
    
### Setting up your Fork with Github Pages

This project uses [Github Pages](https://help.github.com/articles/what-is-github-pages/) as a static site hosting service.  Once you have followed the steps above to deploy your work to your Mayflower fork, you should see that your fork now has a `gh-pages` branch.  Follow these steps (necessary for the first deploy only) to configure your Mayflower fork to serve that static content from your `gh-pages` branch.

1. On GitHub, navigate to your Mayflower fork's repository.
1. Under your repository name, click the Settings tab.
1. From the Settings tab, scroll down to the Github Pages section.
1. Under Source, use the drop-down menu to select `gh-pages` as your GitHub Pages publishing source. (You must have a `gh-pages` branch present for this option show)
1. Click Save.

You should now be able to see the work that you just deployed at `http://<your-github-username>.github.io/mayflower`!

## Release deployment
Mayflower release managers with the necessary repo permissions can follow these steps to deploy a release to production.

Release docs coming soon.

## Static assets

It is possible to build Mayflower's static assets without serving them.  There are two different gulp tasks, depending on the type of environment for which you are building:

##### Building for a dev environment
1. Run `gulp build` from your command line

##### Building for a production environment
1. Run `gulp prod` from your command line
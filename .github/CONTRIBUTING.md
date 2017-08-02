# Contributing to Mayflower

Thanks for contributing to Mayflower!  Please take a minute to review the process outlined in this document to ensure that contribution is easy and effective for everyone involved. 

**On this page:**
1. [Using the issue tracker](#using-the-issue-tracker)
    1. [Issue Labels](#issue-labels)
1. [Bug Reports](#bug-reports)
1. [Feature Requests](#feature-requests)
1. [Submitting Pull Requests](#submitting-pull-requests)
    1. [Getting started](#getting-started)
        1. [Setting up your environment](#setting-up-your-environment)
        1. [Forking the repo](#forking-the-repo)
        1. [Cloning the repo](#cloning-the-repo)
        1. [Installing project dependencies](#installing-project-dependencies)
        1. [Keeping in sync](#keeping-in-sync)
    1. [Submitting your work](#submitting-your-work)
        1. [Spinning up a branch](#spinning-up-a-branch)
        1. [Working with Pattern Lab](#working-with-pattern-lab)
        1. [Committing your work](#committing-your-work)
        1. [Pushing your branch](#pushing-your-branch)
        1. [Deploying your work](#deploying-your-work)
        1. [Creating a Pull Request](#creating-a-pull-request)
        1. [Review by Maintainers](#review-by-maintainers)

## Using the issue tracker
The [issue tracker](https://github.com/massgov/mayflower/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and [submitting pull requests](submitting-pull-requests).

### Issue Labels
We use labels to help identify and organize issues.  Here's what they represent and how we use them:

- `browser bug` - Issues that are reported to us, but actually are the result of a browser-specific bug. These are diagnosed with reduced test cases and result in an issue opened on that browser's own bug tracker.
- `confirmed` - Issues that have been confirmed with a reduced test case and identify a bug in Mayflower.
- `css` - Issues stemming from our compiled CSS or source Sass files.
- `docs` - Issues for improving or updating our documentation.
- `examples` - Issues involving the example patterns (i.e. content or data) included on our site.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified. New features require a minor version bump (e.g., `v3.0.0` to `v3.1.0`).
- `build` - Issues with our build system, which is used to run all our tests, concatenate and compile source files, and more.
- `help wanted` - Issues we need or would love help from the community to resolve.
- `js` - Issues stemming from our compiled or source JavaScript files.
- `meta` - Issues with the project itself or our GitHub repository.

## Bug Reports
A bug is a _demonstrable problem_ that is caused by the code in the repository.  Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or `dev` branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to *you* to make a strong case to convince the project's designers and developers of the merits of this feature. Please provide as much detail and context as possible.

## Pull Requests

Good pull requests—patches, improvements, new features—are a fantastic help!

**Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

You should only edit the source files in [`/styleguide/source/assets/scss/`](https://github.com/massgov/mayflower/tree/master/styleguide/source/assets/scss)
and/or [`/styleguide/source/assets/js/`](https://github.com/massgov/mayflower/tree/master/styleguide/source/assets/js) and/or [`/styleguide/source/_patterns`](https://github.com/massgov/mayflower/tree/master/styleguide/source/_patterns).

**Do not edit the `gh-pages` branch.** That branch is generated and managed separately by the MassDS team.

### Getting Started

#### Setting up your environment
   
In order to run Mayflower locally, you need to have some things installed and set up on your machine.  See the [Setting up your environment](../docs/setting-up-environment.md).

#### Forking the repo

A fork is a *copy* of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project. Learn more about forking repositories on [Github Help](https://help.github.com/articles/fork-a-repo/).

1. Visit the [Mayflower repo on Github](https://github.com/massgov/mayflower)
1. Click the "Fork" icon in the upper right of the page
1. This will create a fork of the project under your user account which you can browse to at: `https://github.com/<your-github-username>/mayflower`

#### Cloning the repo
Right now, you have a fork of the Mayflower repository, but you don't have the files in that repository on your computer. Let's create a clone of your fork locally on your computer.

1. `git clone git@github.com:<your github username>/mayflower.git`
1. Or, if you don't have [ssh set up on your local environment or with github](https://help.github.com/articles/connecting-to-github-with-ssh/), navigate to your fork of the Mayflower repository at `https://github.com/<your-github-username>/mayflower`.
    1. Follow from Step 2 of [Github Help: Cloning a repository](https://help.github.com/articles/cloning-a-repository/).
1. You now have a local representation of *your* Mayflower!  Change directory into the repo root: `cd mayflower`

#### Installing project dependencies

1. Move into the styleguide directory `cd styleguide`
1. Generate pattern lab default files `php core/console --generate`
1. Install npm dependencies `npm install`

#### Keeping in sync

In order to make it easy to keep your fork in sync with the original (`massgov/mayflower`), add the original as a remote:

```
git remote add upstream git@github.com:massgov/mayflower.git
```

If you check your remotes (`git remote -v`), you can now see that you have two "remotes" that your local repo is pointed towards: `origin`, which points to *your* Mayflower fork, and `upstream`, which points to `massgov/mayflower`.

### Submitting your work

#### Creating a branch

Any new features and non-emergency bugfixes should branch from the `dev` branch.  Make sure you're on the `dev`  branch and that it's up-to-date with the source repo. 

If you just forked it, you're probably all set.  But if there have been a lot of changes to the original repo since you forked it, yours might be out of sync. Here's how to get yours in sync:

```
git checkout dev
git fetch upstream
git merge upstream/dev
git push origin dev
```

Now you can create your new branch:

```
git checkout -b my-issue-number-feature-name
```

If you were working on ticket DP-1234-create-backto-link, then you would type:

```
git checkout -b DP-1234-create-backto-link
```

#### Working with Pattern Lab

Serve Mayflower locally and as you save your changes, it will update automatically:

1. Read the [Pattern Lab docs](http://patternlab.io/docs/index.html)!
1. Run `gulp`
1. Browse to [http://localhost:3000/](http://localhost:3000/) (or port shown in gulp output if you've configured it differently)
1. Familiarize yourself with Mayflower:
    - You can use the menu to look at whole page layouts (pages), templates, components (organisms and molecules), child elements (molecules and atoms), and some nuts and bolts (base).
   - You can emulate different device sizes by using the size buttons at the top right of the menu bar (S M L FULL RANDOM DISCO).
   - You can learn about patterns by clicking the top right COG icon, then selecting "Show Pattern Info" from the drop down.
1. All work is done in the `/styleguide/source` directory.
    - Most patterns will have a `.twig` [markup file](https://twig.sensiolabs.org/), `.json` default [data file](http://patternlab.io/docs/data-pattern-specific.html), and `.md` [documentation file](http://patternlab.io/docs/pattern-documenting.html) in the `/styleguide/source/_patterns` directory.
    - If a pattern has styles associated with it, the corresponding `.scss` files can be found in the `/styleguide/source/assets/scss` directory.  We use [SMACSS](https://smacss.com/book/categorizing) to organize and [BEM](http://getbem.com/introduction/) to structure our css.
     - If a pattern has js functionality associated with it, the corresponding [ES6 module](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) `.js` file can be found in the `/styleguide/source/assets/js/modules` directory.
1. These assets will automatically recompile and the browser will refresh as you save changes.

##### Other notes

* It is helpful to have 2 terminal tabs open when working on this project: one to manage `gulp` tasks and the other to manage `git`.  From the tab running `gulp`, type `CTRL` + `C` to kill that task when you're done.
* `Gulp` will build the Pattern Lab static assets and generate a static site in the `/styleguide/public` directory.  See `/styleguide/tools/gulp/gulp-readme.md`.
* Pattern Lab specific files are in the `/styleguide/public/styleguide` directory (the `styleguide.html` file is automatically generated when twig templates are updated).

#### Committing your work

Make your changes and commit them.  Ensure that you only commit the thing you're working on.  Make sure that you commit in logical blocks.
 
Chris Beam explains  [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/):
>  ... a well-crafted Git commit message is the best way to communicate context about a change to fellow developers (and indeed to their future selves). A diff will tell you *what* changed, but only the commit message can properly tell you *why*.

We also love the model Git commit message in Tim Pope's [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

#### Pushing your branch
In order to create a Pull Request (PR) where maintainers can review your work, you first need to push your branch to the origin remote (your Mayflower fork).

To push a new branch:

```
git push -u origin DP-1234-create-backto-link
```

This will create the branch on your Mayflower fork. The `-u` flag links this branch with the remote one, so that in the future, you can simply type `git push origin`.

#### Deploying your work

Once your work is complete, deploy your branch to your Mayflower fork's Github Pages, so that its functionality can be tested and reviewed by someone who doesn't have Mayflower running locally.  See [our deployment docs](../docs/deploy.md#developer-deployment) for step by step instructions.

#### Creating a Pull Request
Pull requests (PRs) let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up commits before the changes are merged into the repository.  

1. Follow the steps on [Github Help: Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).
    - Make sure that the "base fork" points to `massgov/mayflower` and that "base" (branch) points to `dev`.
    - For your PR title, please use: `TICKET Description of ticket`, i.e. `DP-1234 Add back-to button on Announcement template`.  Follow the PR template for the rest of the information.  Keep in mind:
        - Anyone could be reading this Pull Request, so the content and tone may inform people other than those taking part, now or later.
        - Be explicit about what feedback you want, if any: a quick pair of eyes on the code, discussion on the technical approach, critique on design, a review of copy.
        - Be explicit about when you want feedback, if the Pull Request is work in progress, say so. A prefix of “[WIP]” in the title is a simple, common pattern to indicate that state.
        - @mention individuals that you specifically want to involve in the discussion, and mention why. (“/cc @jesconstantine for clarification on this logic”)
        - @mention teams that you want to involve in the discussion, and mention why. (“/cc @github/security, any concerns with this approach?”)

#### Review by Maintainers

Once you've opened your PR, Mayflower maintainers will review and either request changes or merge it.  

Thanks again!

***

## Acknowledgements

Thanks to the [Twitter Bootstrap](https://github.com/twbs/bootstrap) for having great contribution guidelines, and also to Rob Allen's [The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) and Matt Stauffer's [How to contribute to an open-source GitHub project using your own fork](https://mattstauffer.co/blog/how-to-contribute-to-an-open-source-github-project-using-your-own-fork) for providing helpful instructions on working with Github open source projects.

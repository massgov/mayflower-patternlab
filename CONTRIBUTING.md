# Contributing

Thanks for contributing to Mayflower!  Follow the steps on this page to get up an running.  


**On this page:**
1. [Prerequisites](#prerequisites)
1. [Forking the repo](#forking-the-repo)
1. [Cloning the repo](#cloning-the-repo)
1. [Installing project dependencies](#installing-project-dependencies)
1. [Keeping in sync](#keeping-in-sync)
1. [Spinning up a branch](#spinning-up-a-branch)
1. [Working with Pattern Lab](#working-with-pattern-lab)
1. [Committing your work](#committing-your-work)
1. [Pushing your branch](#pushing-your-branch)
1. [Deploying your work](#deploying-your-work)
1. [Creating a Pull Request](#creating-a-pull-request)
1. [Review by Maintainers](#review-by-maintainers)
1. [Acknowledgements](#acknowledgements)

## Prerequisites
   
   In order to run Mayflower locally, you need to have some things installed and set up on your machine.  See the repo [README > Prerequisites](https://github.com/massgov/mayflower/blob/master/README.md#prerequesites).

## Forking the repo

A fork is a *copy* of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project. Learn more about forking repositories on [Github Help](https://help.github.com/articles/fork-a-repo/).

1. Visit the [Mayflower repo on Github](https://github.com/massgov/mayflower)
1. Click the "Fork" icon in the upper right of the page
1. This will create a fork of the project under your user account which you can browse to at: `https://github.com/<your-github-username>/mayflower`

## Cloning the repo
Right now, you have a fork of the Mayflower repository, but you don't have the files in that repository on your computer. Let's create a clone of your fork locally on your computer.

1. On GitHub, navigate to your fork of the Mayflower repository at `https://github.com/<your-github-username>/mayflower`.
1. Click the green Clone or download button in the top right corner.
1. In the Clone with SSH dialog, click the clipboard icon to copy the clone URL for the repository.
1. From your terminal, type `git clone `, and then paste the URL you copied. It will look like this, with your GitHub username instead of `<your-github-username>`: `git clone git@github.com:<your-github-username>/mayflower.git`.
1. Press Enter. Your local clone will be created.

You now have a local representation of *your* Mayflower fork.

## Installing project dependencies

Follow these steps if this is your first time working with the Mayflower project.

1. Move into the styleguide directory `cd mayflower/styleguide`
1. Generate pattern lab default files `php core/console --generate`
1. Install npm dependencies `npm install`

## Keeping in sync

In order to make it easy to keep your fork in sync with the original (`massgov/mayflower`), add the original as a remote:

```
git remote add upstream git@github.com:massgov/mayflower.git
```

If you check your remotes (`git remote -v`), you can now see that you have two "remotes" that your local repo is pointed towards: `origin`, which points to *your* Mayflower fork, and `upstream`, which points to `massgov/mayflower`.

## Spinning up a branch

Any new features and non-emergency bugfixes should branch from the `dev` branch.  Make sure you're on the `dev`  branch and that it's up-to-date with the source repo. 

If you just forked it, it always will be—but if there have been a lot of changes to the original repo since you forked it, yours might be out of sync. Here's how to get yours in sync:

```
git checkout dev
git fetch upstream
git merge upstream/dev
git push origin dev
```

Now you can spin up your new branch:

```
git checkout -b my-issue-number-feature-name
```

If you are working on a ticket DP-1234-create-backto-link, then you would type:

```
git checkout -b DP-1234-create-backto-link
```

## Working with Pattern Lab

Serve Mayflower locally and as you save your changes, it will update automatically:

1. Run `gulp`
1. Browse to [http://localhost:3000/](http://localhost:3000/) (or port shown in gulp output if you've configured it differently)
1. Browser will automatically refresh as you make changes

*Sections about how + what to contribute coming soon...*

**Note:** It is helpful to have 2 terminal tabs open when working on this project: one to manage `gulp` tasks and the other to manage `git`.  From the tab running `gulp`, type `CTRL` + `C` to kill that task when you're done.

### Pattern Lab notes

* All work is done in the `/styleguide/source` directory.
* Mark-up is in the `/styleguide/source/_patterns` directory.
* Front end assets can be found in the `/styleguide/source/assets` directory.
* `Gulp` will build the Pattern Lab static assets and generate a static site in the `/styleguide/public` directory.
* Pattern Lab specific files are in the `/styleguide/public/styleguide` directory (the `styleguide.html` file is automatically generated when twig templates are updated).

For more information, read the [Pattern Lab documentation](http://patternlab.io/docs/index.html).

## Committing your work

Make your changes and commit them.  Ensure that you only commit the thing you're working on.  Make sure that you commit in logical blocks. Each commit message should be sane. Read Tim Pope's [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

```
git add . 
git commit -m "Helpful commit message"
```

## Pushing your branch
In order to create a Pull Request (PR) where maintainers can review your work, you first need to push your branch to the origin remote (your Mayflower fork) and then press some buttons on GitHub.

To push a new branch:

```
git push -u origin DP-1234-create-backto-link
```

This will create the branch on your Mayflower fork. The `-u` flag links this branch with the remote one, so that in the future, you can simply type `git push origin`.

## Deploying your work

Once your work is complete, deploy your branch to your Mayflower fork's Github Pages, so that its functionality can be tested and reviewed by someone who doesn't have Mayflower running locally.  See [our deployment docs](https://github.com/massgov/mayflower/blob/master/docs/deploy.md#developer-deployment) for step by step instructions.

## Creating a Pull Request
Pull requests (PRs) let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up commits before the changes are merged into the repository.  *Learn more about [Pull Requests on Github](https://help.github.com/articles/about-pull-requests/)*.

1. Swap back to the browser and navigate to your Mayflower fork and you'll see that your new branch is listed at the top with a handy "Compare & pull request" button.
1. Go ahead and press that button!
1. On the next page, ensure that the "base fork" points to `massgov/mayflower` and that "base" (branch) points to `dev`.  *Learn more about [Creating Pull Requests across forks on Github](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)*.
1. For your PR title, please use: `TICKET Description of ticket`, i.e. `DP-1234 Add back-to button on Announcement template`.  Follow the PR template for the rest of the information.  Keep in mind:
    - Anyone could be reading this Pull Request, so the content and tone may inform people other than those taking part, now or later.
    - Be explicit about what feedback you want, if any: a quick pair of eyes on the code, discussion on the technical approach, critique on design, a review of copy.
    - Be explicit about when you want feedback, if the Pull Request is work in progress, say so. A prefix of “[WIP]” in the title is a simple, common pattern to indicate that state.
    - @mention individuals that you specifically want to involve in the discussion, and mention why. (“/cc @jesconstantine for clarification on this logic”)
    - @mention teams that you want to involve in the discussion, and mention why. (“/cc @github/security, any concerns with this approach?”)

## Review by Maintainers

Once you've opened your PR, Mayflower maintainers will review and either request changes or merge it.  Thanks again!

## Acknowledgements

Thanks to Rob Allen's [The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) and Matt Stauffer's [How to contribute to an open-source GitHub project using your own fork](https://mattstauffer.co/blog/how-to-contribute-to-an-open-source-github-project-using-your-own-fork) for providing these helpful instructions on working with github open source projects.
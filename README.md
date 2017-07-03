# Mayflower [![GitHub version](https://badge.fury.io/gh/massgov%2Fmayflower.svg)](https://badge.fury.io/gh/massgov%2Fmayflower)
Mayflower is the enterprise design system for the Commonwealth of Massachusetts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for *browsing* and *testing* purposes. 
- See [Contribute](#contribute) section for instructions on setting up your fork and repo for development and contribution purposes.
- See [Deployment](#deployment) section for notes on how to deploy the project to a live environment.

### Prerequisites

In order to run Mayflower locally, you need to have some things installed and set up on your machine:

1. Install PHP 
    - See steps for [windows](https://www.sitepoint.com/how-to-install-php-on-windows/) || [mac os](https://ryanwinchester.ca/posts/install-php-5-6-in-osx-10-with-homebrew)
2. Install NodeJS [version 6.9.4](https://nodejs.org/en/blog/release/v6.9.4/)
    - If you need a different version of NodeJS for another project, you can use a tool like [N](https://github.com/tj/n) or [NVM](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/) to manage multiple versions.
3. Install GulpJS [globally](https://docs.npmjs.com/getting-started/installing-npm-packages-globally) 
    - Run `npm install -g gulp-cli` from your command line

### Installing
Follow these steps to get up and running to *view* or *test* Mayflower.  Developers should see our [Contribute](#contribute) section for directions on how to set up your repo for development and contribution purposes.

1. Clone this repo `git clone git@github.com:massgov/mayflower.git`
1. Move into the styleguide directory `cd mayflower/styleguide`
1. Generate pattern lab default files `php core/console --generate`
1. Install npm dependencies `npm install`
1. Run `gulp`
1. Browse to [http://localhost:3000/](http://localhost:3000/) (or port shown in gulp output if you've configured it differently)
1. Take a look through Mayflower!  
    - You can use the menu to look at whole page layouts (pages), templates, components (organisms and molecules), child elements (molecules and atoms), and some nuts and bolts (base).
    - You can emulate different device sizes by using the size buttons at the top right of the menu bar (S M L FULL RANDOM DISCO).  
    - You can learn about patterns by clicking the top right COG icon, then selecting "Show Pattern Info" from the drop down.
1. When you're done looking, type `CTRL` + `C`  from your active terminal session to kill the `gulp` task.  You can always run `gulp` again from the `mayflower/styleguide` directory to get it back up and running.

## Deployment

See [/docs/deploy.md](https://github.com/massgov/mayflower/blob/master/docs/deploy.md) for steps on [deploying development work to a Mayflower fork's Github Pages](https://github.com/massgov/mayflower/blob/master/docs/deploy.md#developer-deployment) as well as [production release deployment](https://github.com/massgov/mayflower/blob/master/docs/deploy.md#release-deployment).

### Mayflower Artifacts
Tagged releases are automatically (via CircleCI) deployed to the [Mayflower Artifacts](https://github.com/palantirnet/mayflower-artifacts) repo for consumption by the Palantir team. Tags should follow [semantic versioning](https://github.com/sindresorhus/semver-regex) conventions.

In order to be deployed, tags must follow the format: `#.#.#-optionalwords-optionalwords` (regex: `/\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/`).  

If you do not see your tag being deployed:
1. Make sure your tag name is unique
1. Test your tag name [here](https://regex101.com/r/UJGppF/2)
1. Check circleci builds for mayflower project to see if there are any errors

## Built With

* [Pattern Lab 2 (PHP)](http://patternlab.io/docs/index.html) - The framework used
* [Twig](https://twig.sensiolabs.org/) - The templating language

## Contribute

Please read [CONTRIBUTING.md](https://github.com/massgov/mayflower/blob/master/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/massgov/mayflower/tags).

What SemVer means for Mayflower section coming soon...

## License

This project is licensed under the is licensed under the GNU General Public License v2.0 - see the [LICENSE.txt](https://github.com/massgov/mayflower/blob/master/LICENSE.txt) file for details.

## Acknowledgments

* [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/) methodology by Brad Frost
* This awesome [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) by [@PurpleBooth](https://gist.github.com/PurpleBooth)

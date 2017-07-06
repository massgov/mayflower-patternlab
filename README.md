# Mayflower [![GitHub version](https://badge.fury.io/gh/massgov%2Fmayflower.svg)](https://badge.fury.io/gh/massgov%2Fmayflower)
Mayflower is the enterprise design system for the Commonwealth of Massachusetts.

## Getting Started

### Setting up your environment

In order to run Mayflower locally, you need to have some things installed and set up on your machine.  Follow the steps in [Setting up your environment](/docs/setting-up-environment.md).

### Installing
- Follow the steps in [Demo Install](/docs/demo-install.md) to get a copy of the project up and running on your local machine for *demo* and *testing* purposes. 
- See the [Contribute docs](#contribute) for instructions on setting up your fork and repo for *development* and *contribution* purposes.
- See the [Deployment docs](https://github.com/massgov/mayflower/blob/master/docs/deploy.md)  for notes on how to deploy the project to a live environment.



## Deployment

See [/docs/deploy.md](https://github.com/massgov/mayflower/blob/master/docs/deploy.md) for steps on [deploying development work to a Mayflower fork's Github Pages](https://github.com/massgov/mayflower/blob/master/docs/deploy.md#developer-deployment) as well as [production release deployment](https://github.com/massgov/mayflower/blob/master/docs/deploy.md#release-deployment).

## Mayflower Artifacts
Some Mass Digital Services projects (i.e. [massgov/mass](https://github.com/massgov/mass)) use twig templates for markup in addition to the static css, js, + icon assets from Mayflower.  To establish that dependency, those projects point their dependency manager (i.e. [composer](https://getcomposer.org/doc/00-intro.md)) to the [Mayflower Artifacts](https://github.com/palantirnet/mayflower-artifacts) repository which consists of these assets.

Tagged releases from Mayflower are automatically (via CircleCI) deployed to the Mayflower Artifacts repository. Tags should follow [semantic versioning](https://github.com/sindresorhus/semver-regex) conventions and must follow the format: `#.#.#-optionalword-optionalword`.  

If you do not see your tag being deployed:
1. Make sure your tag name is unique.
1. Test your tag name with this [regex test](https://regex101.com/r/UJGppF/2).
1. Check CircleCI builds for Mayflower project to see if there are any errors.

## Built With

* [Pattern Lab 2 (PHP)](http://patternlab.io/docs/index.html) - The pattern framework / static site generator
* [Twig](https://twig.sensiolabs.org/) - The templating language

## Contribute

Please read [CONTRIBUTING.md](https://github.com/massgov/mayflower/blob/master/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/massgov/mayflower/tags).

**What SemVer means for Mayflower section coming soon...**

## License

This project is licensed under the is licensed under the GNU General Public License v2.0 - see the [LICENSE.txt](https://github.com/massgov/mayflower/blob/master/LICENSE.txt) file for details.

## Acknowledgments

* [Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/) methodology by Brad Frost
* This awesome [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) by [@PurpleBooth](https://gist.github.com/PurpleBooth)

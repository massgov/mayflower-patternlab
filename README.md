# Style Guide

This living style guide is built using [PatternLab](http://patternlab.io).

## Developer Setup (Local Machine)

### Dependencies

- [Docker Community Edition](https://store.docker.com/search?offering=community&type=edition)

### First Developer Time Setup

Do this the first time you're setting up the project, or when `Dockerfile` changes.

1. Open a terminal/command prompt into the directory this project is cloned from
1. `docker build -t massgov/mayflower .`

_Note: This step can go away if we start deploying to Docker Hub whenever we update Mayflower via CircleCI_

### Run Local Server

1. Open a terminal/command prompt into the root directory of the project
1. `docker run -i -v $PWD/styleguide:/usr/local/src -p 3000:3000 massgov/mayflower`
  - This does the following:
    - Generates the PHP/Twig templates
    - Runs `gulp`
    - Maps the directory from your local machine into the Linux Docker container
    - Maps your local port 3000 to the Docker container's port 3000
  - To run a different command, just add your command to the end (example: `bash` or `gulp prod` or `npm install`)

## Running Standalone

_Note: This does not work as-is right now, as we haven't deployed our image to Docker Hub yet._

1. Have Docker running locally or on the server you're deploying to
1. `docker run -d -p <port exposed>:3000 massgov/mayflower`

## Updating the Docker Image on Docker Hub

1. Open a terminal/command prompt into the directory this project is cloned from
1. Login to your Docker Hub account that has access to the `massgov` Docker org
1. `docker build -t massgov/mayflower:<version> .`
1. `docker push massgov/mayflower:<version>`

## Working with PatternLab

* All work is done in the source folder.
* Mark-up is in the `source/_patterns` directory.
* Front end assets can be found in the `source/assets` directory
* Gulp will handle the conversion of files from source to public
* Pattern Lab specific files are in the `/public/styleguide` directory (the `styleguide.html` file is automatically generated when twig templates are updated)

# Release Deployment

Tagged releases are automatically (via CircleCI) deployed to the [Mayflower Artifacts](https://github.com/palantirnet/mayflower-artifacts) repo for consumption by the Palantir team. Tags should follow [semantic versioning](https://github.com/sindresorhus/semver-regex) conventions.

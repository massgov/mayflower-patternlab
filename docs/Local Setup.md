# Local Setup

Instructions if you prefer to not use a Docker container.

## Machine set up

1. Install PHP
1. Install NodeJS version 6.9.4 (https://nodejs.org/en/download/)
1. Install GulpJS, via command line `npm install -g gulp`

## Set up instructions

1. Clone Repo
1. Move into the styleguide directory `cd mayflower/styleguide`
1. Generate pattern lab default files `php core/console --generate`
1. Install npm dependencies `npm install`

## Generate a styleguide

### For local development

1. run `gulp`
1. launch browser at http://localhost:3000/ or port shown in gulp output
1. Browser will automatically refresh as you make changes

### For a dev environment

1. run `gulp build`

### For a production environment

1. run `gulp prod`

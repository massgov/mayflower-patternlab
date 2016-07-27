#Style Guide
This living styleguide is built using PatternLab.

##Machine set up
1. Install PHP
2. Install NodeJS
3. Install GulpJS

##Set up instructions
1. Clone Repo
2. Move into the styleguide directory `cd mayflower/styleguide`
3. Generate pattern lab default files `php core/console --generate`
4. Install npm dependencies `npm install`

##Generate a styleguide
### For local development
1. run `gulp`
2. launch browser at http://localhost:3000/ or port shown in gulp output
3. Browser will automatically refresh as you make changes

### For a dev environment
1. run 'gulp build'

### For a production environment
1. run 'gulp prod'

#Working with PatternLab
##All work is done in the source folder.
* Mark-up is in the source/_patterns directory.
* Front end assets can be found in the source/assets directory
* Gulp will handle the conversion of files from source to public
* Pattern Lab specific files are in the /public/styleguide directory (the styleguide.html file is automatically generated when twig templates are updated)
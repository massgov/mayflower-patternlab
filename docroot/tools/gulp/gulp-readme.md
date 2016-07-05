Gulp Usage
==========

Once per computer:
------------------
1. Install node from [https://nodejs.org/](https://nodejs.org/)
2. Install gulp globally:  
   `npm install -g gulp-cli`

Once per project
----------------
This will add gulp to this project and all the other packages that it
needs to compile css, etc. All these dependancies get installed to the
node_modules folder.  If things get messed up, you can delete this
folder and reinstall.

1. Navigate to the folder containing gulpfile.js:  
   either `cd /tools/gulp`, or at the project root.
2. Install dependancies  
   `npm install`

Running gulp
------------

1. Navigate to the folder containing gulpfile.js:  
    either `cd /tools/gulp`, or at the project root.
2. Run gulp for dev or prod:
  * `gulp`  
    Will run the dev task that will watch for changes in the source files.
    For example, if you change index.scss, gulp will run the css task to
    compile the sass to css automatically. You will see this happen in your
    terminal.
  * `gulp build`
    Will run the dev task _without_ watcher.  
  * `gulp prod`  
    Will run the prod task that will not watch, and it will compile the files for
    production (minified, etc).  This should be used for Continuous Integration.

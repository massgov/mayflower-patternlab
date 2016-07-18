/**
 *  Usage:
 *      Once per computer:
 *         $ npm install -g gulp-cli
 *
 *      Once per project, in gulp folder:
 *         $ npm install
 *
 *
 *      Running clumped tasks (defined in this file) --
 *      see quench.js build function
 *         $ gulp dev
 *
 *      Running single task (task defined in /tasks.  eg. /tasks/css.js)
 *         $ gulp css                  // will use the development environment
 *         $ gulp css --env production // will use the production environment
 *
 *      For details on build config, see "user supplied keys" in quench.js
**/

// Include gulp and plugins
var gulp    = require("gulp"),
    quench  = require("./quench.js"),
    path    = require("path");


// default configuration
var defaults = {
    root: path.resolve(__dirname, "../../source/assets"),
    dest: path.resolve(__dirname, "../../public/assets"),
    patternLabRoot: path.resolve(__dirname, "../../"),
    rootSite: path.resolve(__dirname, "../../public"),
    // removing js for now, but we may want to concatenate
//    tasks: ["js", "js-common", "css", "bower", "svg-sprite"],
    tasks: ["css", "bower", "svg-sprite"],
    env: "development", // "development", "production", "local"
    watch: false,
    browserSync: false
};

/**
 * development task
 * Default Task (run when you run 'gulp').
 */
gulp.task("default", function(){

    var config = Object.assign({}, defaults, {
        env   : "development",
        watch : true,
        browserSync: true,
        tasks : defaults.tasks.concat("patternlab")
    });

    quench.build(config);

});

/**
 * production task
 */
gulp.task("prod", function(){

    var config = Object.assign({}, defaults, {
        env   : "production",
        watch : false,
        browserSync: false
    });

    quench.build(config);

});

/**
 * build for development without a watcher
 */
gulp.task("build", function(){

    var config = Object.assign({}, defaults, {
        env   : "development",
        watch : false,
        browserSync: false,
        tasks : defaults.tasks.concat("patternlab")
    });

    quench.build(config);

});

// watch for single tasks on the command line, eg "gulp js"
quench.singleTasks(defaults);

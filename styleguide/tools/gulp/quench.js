/**
 *    Quench: utilities for gulp builds
 */
var gulp        = require("gulp"),
    plumber     = require("gulp-plumber"),
    notify      = require("gulp-notify"),
    env         = require("gulp-environments"),
    fs          = require("fs"),
    path        = require("path"),
    runSequence = require("run-sequence"),
    color       = require("cli-color"),
    argv        = require("yargs").argv,
    watch       = require("gulp-watch");

var environments = ["development", "production", "local"];

/**
 * Task files (located in ./tasks/ should be modules that export a function
 * eg: module.exports = function cssTask(config, env){ ... }
 *
 * The function should register watcher via quench.registerWatcher and
 * create a gulp task with gulp.task().  The task name should be exactly the
 * same as the filename.  eg. js-common.js should define the "js-common" task
 *
 * The parameters passed to this module's function:
 * @param config: the object passed to build() in gulpfile.js.  this can
 *                be used to configure the tasks.  It is also augmented with
 *                config.local from local.js
 *                See config below
 * @param env   : an instance of gulp-environments.  Basic usage:
 *                eg: env.development() ? "nested" : "compressed"
 *                eg: .pipe(env.production(uglify()))
 *                see https://github.com/gunpowderlabs/gulp-environments
 */

/**
 * Exposed functions: (see function comments for more details)
 *     drano
 *     registerWatcher
 *     build
 *     logYellow
 *     logError
 *     singleTasks
 *     findPackageJson
 *     getInstalledNPMPackages
 */

/**
 *    config: an object passed to build and augmented with the following keys:
 *
 *    reserved keys: {
 *        local: {},
 *        watchers: []
 *    }
 *
 *    user supplied keys: eg. {
 *        root: path.resolve(__dirname, "../../web/Website/assets"),
 *        dest: path.resolve(__dirname, "../../web/Website/assets/build"),
 *        env: "development", // "development", "production", or "local"
 *        tasks: ["js", "css"],
 *        watch: true,
 *        browserSync: true
 *    }
 *
 */
var config = {};

// register the environments with gulp-environments
environments.forEach(function(environment){
    env[environment] = env.make(environment);
});


/**
 * getTaskPath: Given a task name, get the require-able path to the javascript file
 * @param  {String} task: the name of the task that is located in ./tasks.  Do not include the file extension (.js)
 * @return {String} The relative path to the task file
 */
function getTaskPath(task){
    return path.join(__dirname, "tasks", task + ".js");
}


/**
 * drano: make plumber with error handler attached
 * see https://www.npmjs.com/package/gulp-plumber
 * eg: .pipe(quench.drano())
 * @return {Function}
 */
module.exports.drano = function drano(){
    return plumber({
        errorHandler: function(error) {

            // gulp notify is freezing jenkins builds, so we're only going to show this message if we're watching
            if (config.watch){
                notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(error);
            }
            else {
                logError(error.relativePath + " " + error.line + ":" + error.column + "\n", error.formatted);
                process.exit(1);
            }
            this.emit("end");
        }
    });
};


/**
 * registerWatcher: add a function to the watchers
 * @param  {String} watcherTask : a task name, eg: "css"
 * @param  {Array} watcherFiles : Array of globs
 * @usage quench.registerWatcher("js", [ config.root + "/js-source/*.js"]);
 * @return {Nothing}
 */
module.exports.registerWatcher = function registerWatch(watcherTask, watcherFiles){

    config.watchers = config.watchers || [];

    config.watchers.push({
        task: watcherTask,
        files: watcherFiles
    });
};


/**
 * build: load and start tasks
 * @param  {Object} _config: see "var config" above
 * @return {Nothing}
 */
var build = module.exports.build = function build(_config) {

    config = _config;

    if (!config.root || !config.dest){
        logError("config.root and config.dest are required!");
        console.log("config:", JSON.stringify(config, null, 2));
        process.exit();
    }

    if (!config.tasks || config.tasks.length === 0){
        logError("No tasks loaded! Make sure you pass config.tasks as an array of task names to quench.build(config)!");
        console.log("config:", JSON.stringify(config, null, 2));
        process.exit();
    }

    // set the environment
    var environment = argv.env || config.env;
    if (environment){

        // make sure config.env is up to date (if argv.env was specified)
        config.env = environment;

        // validate the env
        if (environments.indexOf(environment) === -1){
            logError("Environment '" + environment + "' not found! Check your spelling or add a new environment in quench.js.");
            logError("Valid environments: " + environments.join(", "));
            process.exit();
        }

        // set NODE_ENV https://facebook.github.io/react/downloads.html#npm
        process.env.NODE_ENV = environment;
        // set gulp-environments
        env.current(env[environment]);

        if (config.watch){
            // gulp notify is freezing jenkins builds, so we're only going to show this message if we're watching
            gulp.src("").pipe(notify("Building for '" + config.env + "' environment"));
        }
        else {
            console.log(color.green("Building for '" + config.env + "' environment"));
        }


    }

    // load local.js config or initalize to empty object
    var localJs = path.join(__dirname, "local.js");
    config.local = fileExists(localJs) ? require(localJs) : {};


    if(config.patternlab) {
        config.tasks.push('patternlab');
    }

    //  loadTasks: given an array of tasks, require them, and pass params
    config.tasks.forEach(function(name) {
        // console.log("loading task: ", name);
        var taskFactory = require(getTaskPath(name));
        taskFactory(config, env);
    });

    // start watchers if specified
    if (config.watch && config.watchers) {

        // start the gulp watch for each registered watcher
        config.watchers.forEach(function(watcher){

            // only watch this task if it's in our task list
            if (config.tasks.indexOf(watcher.task) !== -1) {
                logYellow("watching", watcher.task + ":", JSON.stringify(watcher.files, null, 2));

                // using gulp-watch instead of gulp.watch because gulp-watch will
                // recognize when new files are added/deleted.
                watch(watcher.files, function(){
                    gulp.start([watcher.task]);
                });
            }
        });
    }

    // browserSync needs special treatment because it needs to be started AFTER the
    // build directory has been created and filled (for livereload to work)
    if (config.tasks && config.browserSync){
        require(getTaskPath("browser-sync"))(config, env);
        runSequence(config.tasks, "browserSync");
    }
    // or just run the tasks
    else if (config.tasks){
        gulp.start(config.tasks);
    }

};


/**
 * logYellow: will log the output with the first arg as yellow
 * eg. logYellow("watching", "css:", files) >> [watching] css: ["some", "files"]
 * @return {Nothing}
 */
var logYellow = module.exports.logYellow = function logYellow(){

    var args = (Array.prototype.slice.call(arguments));
    var first = args.shift();

    if (args.length){

        var argString = args.map(function(arg){
            return (typeof arg  === "object") ? JSON.stringify(arg) : arg.toString();
        }).join(" ");

        console.log("[" + color.yellow(first) + "]", argString);
    }
};


/**
 * logError: will log the output in red
 * @return {Nothing}
 */
var logError = module.exports.logError = function logError() {

    var args = (Array.prototype.slice.call(arguments));

    if (args.length){

        var argString = args.map(function(arg){
            // return (typeof arg  === "object") ? JSON.stringify(arg) : arg.toString();
            return arg.toString();
        }).join("");

        console.log(color.red(argString));
    }

};


/**
 * singleTasks: watch the command for single tasks, eg "gulp js"
 * @param  {Object} config: config object to be used with build
 * @return {Nothing}
 */
module.exports.singleTasks = function singleTasks(config){

    if (argv._.length){

        // filter out tasks that don't exist
        var tasks = argv._.filter(function(task) {
            // console.log(getTaskPath(task));
            return fileExists(getTaskPath(task));
        });

        if (tasks.length){
            // load and build those tasks
            build(Object.assign({}, config, {
                tasks: tasks
            }));
        }
    }
};

/**
 * fileExists
 * @param  {String} filepath
 * @return {Boolean} true if the filepath exists and is readable
 */
function fileExists(filepath){
    try {
        fs.accessSync(filepath, fs.R_OK);
        return true;
    }
    catch(e) {
        return false;
    }
}


/**
 * findPackageJson: recursively walk up the directory ancestry to find package.json
 * @param  {String} dirname: optional, will use __dirname if missing
 * @return {String} the filepath of package.json in this directory,
 *                  or any parent directory
 */
var findPackageJson = module.exports.findPackageJson = function findPackageJson(dirname){

    // use the current directory if dirname wasn't provided.
    if (typeof(dirname) === "undefined"){
        dirname = path.resolve(__dirname);
    }

    // use absolute path
    dirname = path.resolve(dirname);

    // create a filepath to package.json in this directory
    var filepath = path.resolve(dirname, "package.json");

    // check if it's there, if so, return the directory
    if (fileExists(filepath)) {
        return filepath;
    }

    // otherwise, check the parent
    var parent = path.resolve(dirname, "..");

    // if we've hit the root and haven't found it, return undefined
    if (parent === dirname){
        return;
    }

    // otherwise, recurse into the parent
    return findPackageJson(parent);
};


/**
 * getInstalledNPMPackages: looks for package.json in this directory and
 *                          in parent directories
 * @return {Array} an array of package names (strings).
 *                 eg ["react", "react-dom", "classnames"]
 */
module.exports.getInstalledNPMPackages = function getInstalledNPMPackages(){

    var packageJsonPath = findPackageJson();

    var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    var dependencies = packageJson.dependencies;

    return Object.keys(dependencies);
};


/** Object.assign polyfill **/
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
        "use strict";
        if (target == null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      }
  });
}

var gulp         = require('gulp'),
    quench       = require("../quench.js"),
    run          = require('gulp-run'),
    browserSync  = require("browser-sync");

/**
 * Usage: convert twig templates into flat html files
 */

module.exports = function patternLabTask(config, env){


    gulp.task('patternlab', function() {
        run('php ' + config.rootTheme + '/core/console --generate').exec(function() {
            browserSync.reload();
        });
    });

    // register the watch
    quench.registerWatcher("patternlab", [
        config.rootTheme + "/source/**/*.{twig,mustache,json}"
    ]);

};
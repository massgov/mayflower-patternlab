var gulp         = require('gulp'),
    quench       = require("../quench.js"),
    run          = require('gulp-run'),
    browserSync  = require("browser-sync");

/**
 * Usage: convert twig templates into flat html files
 */

module.exports = function patternLabTask(config, env){

    console.log

    gulp.task('patternlab', function() {
        run('php ' + config.patternLabRoot + '/core/console --generate').exec(function() {
            browserSync.reload();
        });
    });

    // register the watch
    quench.registerWatcher("patternlab", [
        config.root + "/**/*.{twig,json}"
    ]);

};

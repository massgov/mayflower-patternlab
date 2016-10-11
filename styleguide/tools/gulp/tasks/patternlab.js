var gulp         = require('gulp'),
    quench       = require("../quench.js"),
    run          = require('gulp-run'),
    browserSync  = require("browser-sync");

/**
 * Usage: convert twig templates into flat html files
 */

module.exports = function patternLabTask(config, env){

    if (config.patternlab === true){

        gulp.task('patternlab', function() {
            run('php ' + config.patternLabRoot + '/core/console --generate --patternsonly').exec();
        });

        // register the watch
        quench.registerWatcher("patternlab", [
            config.patternLabRoot + "/source/**/*.{twig,mustache,json}"
        ]);
        
    }

};

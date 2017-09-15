var gulp         = require("gulp"),
    quench       = require("../quench.js"),
    run          = require("gulp-run");

/**
 * Usage: convert twig templates into flat html files
 */

module.exports = function patternLabTask(config, env){

    var bsPort = config.local.browserSyncPort || 3000;
    var command = "php " + config.patternLabRoot + "/core/console --generate --patternsonly";

    if(config.browserSync) {
        command = command + " && browser-sync reload --port " + bsPort;
    }

    gulp.task("patternlab", function() {
        run(command).exec();
    });

    // gulp.task('patternlab', function(next) {
    //     return run('php ' + config.patternLabRoot + '/core/console --generate --patternsonly').exec("", next);
    // });

    // register the watch
    quench.registerWatcher("patternlab", [
        config.patternLabRoot + "/source/**/*.{twig,mustache,json,md}"
    ]);

};

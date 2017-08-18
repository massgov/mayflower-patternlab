var gulp         = require("gulp"),
    quench       = require("../quench.js"),
    run          = require("gulp-run");

/**
 * Usage: convert twig templates into flat html files
 */

module.exports = function patternLabTask(config, env){

    var bsPort = config.local.browserSyncPort || 3000;
    
    gulp.task("patternlab", function() {
        run("php " + config.patternLabRoot + "/core/console --generate --patternsonly && browser-sync reload --port " + bsPort).exec();
    });

    // register the watch
    quench.registerWatcher("patternlab", [
        config.patternLabRoot + "/source/**/*.{twig,mustache,json,md}"
    ]);

};

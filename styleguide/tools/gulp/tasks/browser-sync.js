/**
 * This is a special task, do not include this in your build.tasks configuration.
 * This is handled in quench.js by passing browserSync: true
 * in the build config to quench.build().
 */
var gulp           = require("gulp"),
    quench         = require("../quench.js"),
    path           = require("path"),
    browserSync    = require("browser-sync").create();

module.exports = function(config, env){

    // if not using proxy, use this as the server root
    var serverRoot = path.resolve(config.root, "..");

    // browserSync settings
    var settings = {
        port: config.local.browserSyncPort || 3000,
        open: false, // or  "external"
        notify: false,
        ghostMode: false,

        // watch these files and reload the browser when they change
        files: [
            config.dest + "/**",
            // prevent browser sync from reloading twice when the regular file (eg. index.js)
            // and the map file (eg. index.js.map) are generated
            "!**/*.map"
        ]
    };


    // set the server root, or proxy if it's set in local.js
    // use proxy if you have a server running the site already (eg, IIS)
    if (config.local.hostname) {
        // http://www.browsersync.io/docs/options/#option-proxy
        settings.proxy = config.local.hostname;
    }
    else {
        // http://www.browsersync.io/docs/options/#option-server
        settings.server = serverRoot;
    }


    /* start browser sync if we have the "watch" option */
    gulp.task("browserSync", function(){

        if (config.watch === true){
            quench.logYellow("watching", "browserSync:", JSON.stringify(settings.files, null, 2));
            browserSync.init(settings);
        }

    });
};

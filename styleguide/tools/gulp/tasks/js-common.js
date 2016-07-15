var gulp           = require("gulp"),
    quench         = require("../quench.js"),
    uglify         = require("gulp-uglify"),
    rename         = require("gulp-rename"),
    debug          = require("gulp-debug"),
    sourcemaps     = require("gulp-sourcemaps"),
    browserify     = require("browserify"),
    vinylSource    = require("vinyl-source-stream"),
    vinylBuffer    = require("vinyl-buffer");

module.exports = function jsCommonTask(config, env){

    var js = {
        dest: config.dest + "/js",

        commonFilename: "common.js",

        // js uglify options. to skip, set value to false or omit entirely
        // otherwise, pass options object (can be empty {})
        uglify: {},

        // browserify options
        browserify: {
            // enable sourcemaps for development
            debug: env.development()
        }
    };

    // register the watch
    quench.registerWatcher("js-common", [
        quench.findPackageJson()
    ]);

    gulp.task("js-common", function(){

        var commonPackages = quench.getInstalledNPMPackages();

        return getCommonStream(commonPackages, js.commonFilename, js.browserify)
            .pipe(quench.drano())
            .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
            .pipe(env.production( uglify(js.uglify) ))
            .pipe(rename({
                suffix: "-generated"
            }))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(js.dest))
            .pipe(debug({title: "js-common: "}));
    });
}

// http://stackoverflow.com/questions/30294003/how-to-avoid-code-duplication-using-browserify/30294762#30294762
// create browserify bundle with the common packages exposed
function getCommonStream(externalPackages, filename, browserifyOptions){

        // will expose externalPackages, eg. "react"
        var b = browserify(Object.assign({}, browserifyOptions, {
            require: externalPackages
        }));

        quench.logYellow("common npm packages", externalPackages);

    return b.bundle()
        .pipe(vinylSource(filename)) // bs to make it work with gulp
        .pipe(vinylBuffer()); // https://github.com/gulpjs/gulp/issues/369 more bs to make it work with gulp;
}

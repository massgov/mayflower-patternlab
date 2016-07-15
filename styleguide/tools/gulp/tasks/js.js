var gulp           = require("gulp"),
    quench         = require("../quench.js"),
    uglify         = require("gulp-uglify"),
    rename         = require("gulp-rename"),
    cached         = require("gulp-cached"),
    debug          = require("gulp-debug"),
    sourcemaps     = require("gulp-sourcemaps"),
    browserify     = require("browserify"),
    through2       = require("through2"),
    babelify       = require("babelify");

module.exports = function jsTask(config, env){

    var jsConfig = {
        pages: config.root + "/js/**/*.js",
        dest: config.root + "/js",
        // js uglify options.
        uglify: {},
        // browserify options
        browserify: {
            // enable sourcemaps for development
            debug: env.development()
        }
    };

    // register the watch
    quench.registerWatcher("js", [
        config.root + "/js-source/**/*.js",
        config.root + "/js-source/**/*.jsx"
    ]);


    /* compile application javascript */
    gulp.task("js", function(){

        var commonPackages = quench.getInstalledNPMPackages();

        return gulp.src(jsConfig.pages)
            .pipe(quench.drano())
            .pipe(bundleEm(jsConfig.browserify, commonPackages))
            .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
            .pipe(env.production( uglify(jsConfig.uglify) ))
            .pipe(rename({
                suffix: "-generated"
            }))
            .pipe(sourcemaps.write("./"))
            // prevent unchanged files from passing through, this prevents browserSync from reloading twice
            .pipe(cached("js"))
            .pipe(gulp.dest(jsConfig.dest))
            .pipe(debug({title: "js: "}));

    });
}



// Create a bundle of the files in the stream using browserify
function bundleEm(browserifyOptions, externalPackages){

    return through2.obj(function (file, enc, callback){

        // https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
        var b = browserify(browserifyOptions || {}) // pass options
            .add(file.path) // this file
            .transform(babelify); // run it through babel, for es6 transpiling

        // externalize common packages
        try {
            externalPackages.forEach(function(p){
                b.external(p);
            });

            // quench.logYellow("common npm packages", externalPackages);
        }
        catch(e) { console.log("ERRR", e); /* do nothing */ }

        b.bundle(function(err, res){
            if (err){
                callback(err, null); // emit error so drano can do it's thang
            }
            else {
                file.contents = res; // assumes file.contents is a Buffer
                callback(null, file); // pass file along
            }
        });

    });
}

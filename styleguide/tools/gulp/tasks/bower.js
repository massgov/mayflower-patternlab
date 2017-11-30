var gulp           = require("gulp"),
    quench         = require("../quench.js"),
    concat         = require("gulp-concat"),
    filter         = require("gulp-filter"),
    rename         = require("gulp-rename"),
    debug          = require("gulp-debug"),
    uglify         = require("gulp-uglify"),
    sourcemaps     = require("gulp-sourcemaps"),
    mainBowerFiles = require("main-bower-files");

module.exports = function bowerTask(config, env){

    // bower config
    var bower =  {
        root: config.root + "/js/vendor",
        filename: "vendor.js",
        dest: config.dest + "/js",
        uglify: {
          'keep_names': true,
          'mangle': false
        }
    };


    // watch bower.json to regenerate bundle
    quench.registerWatcher("bower", [
        bower.root + "/bower.json"
    ]);


    /* bundle up bower libraries */
    // http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
    gulp.task("bower", function(next){

        if (!bower || !bower.root){
            quench.logYellow("bower", "not configured");
            next(); return;
        }

        // https://github.com/ck86/main-bower-files
        // mainBowerFiles returns array of "main" files from bower.json
        var bowerfiles = mainBowerFiles({
            checkExistence: true,
            paths: bower.root,
            debugging: false
        });

        if (bowerfiles.length === 0){
            next(); return;
        }

        // log the bower files to the gulp output
        quench.logYellow("vendor files", "\n\t" + bowerfiles.join("\n\t"));

        // make js
        return gulp.src(bowerfiles)
            .pipe(quench.drano())
            .pipe(filterByExtension("js"))
            .pipe(sourcemaps.init())  // start sourcemaps

            // putting a ; between each file to avoid problems when a library doesn't end in ;
            .pipe(concat(bower.filename, {newLine: ";"}))

            .pipe(env.production( uglify(bower.uglify) ))
            .pipe(rename({
                suffix: "-generated"
            }))
            .pipe(sourcemaps.write("./")) // end sourcemaps
            .pipe(gulp.dest(bower.dest))
            .pipe(debug({title: "bower: "}));

    });

};


function filterByExtension(extension){
    return filter(function(file){
        return file.path.match(new RegExp("." + extension + "$"));
    });
}

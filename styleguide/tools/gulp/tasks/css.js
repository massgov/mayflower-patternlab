var gulp          = require("gulp"),
    quench        = require("../quench.js"),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    rename        = require("gulp-rename"),
    debug         = require("gulp-debug"),
    header        = require("gulp-header"),
    concat        = require("gulp-concat"),
    sourcemaps    = require("gulp-sourcemaps");

module.exports = function cssTask(config, env){

    // css settings
    var cssConfig = {
        src: config.root + "/css/**/*.scss",
        dest: config.root + "/css/",

        filename: "style.css",

        sass: {
            outputStyle: env.development() ? "nested" : "compressed"
        },

        autoprefixer: {
            browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie >= 9"]
        }
    };

    // register the watch
    quench.registerWatcher("css", [
        config.root + "/css/scss/**/*.scss"
    ]);


    /* css task */
    gulp.task("css", function() {

        var gulpCss = gulp.src(cssConfig.src)
            .pipe(quench.drano())
            .pipe(sourcemaps.init())
            .pipe(sass(cssConfig.sass))
            .pipe(autoprefixer(cssConfig.autoprefixer))
            .pipe(pixrem("16px",{atrules: true, html: true}))
            .pipe(concat(cssConfig.filename, {newLine: ""}));

        // only add the header text if this css isn't compressed
        if (cssConfig.sass && cssConfig.sass.outputStyle !== "compressed"){
            gulpCss.pipe(header("/* This file is generated.  DO NOT EDIT. */ \n"));
        }

        // right now this just generates the css file and requires the
        // "php core/console --generate" command to move it to the public directory
        return gulpCss
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(cssConfig.dest))
            .pipe(debug({title: "css:"}));
    });
};

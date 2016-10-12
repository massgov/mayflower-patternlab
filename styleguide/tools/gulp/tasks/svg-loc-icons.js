var gulp           = require("gulp"),
    quench         = require("../quench.js"),
    svgmin         = require("gulp-svgmin"),
    svgstore       = require("gulp-svgstore"),
    rename         = require("gulp-rename"),
    debug          = require("gulp-debug");

/**
 * Usage: put svg's in svg.src directory.  eg. /img/svg-sprite/my-icon.svg
 *        They will be compiled into svg.filename. eg. /img/svg-sprite.svg
 *
 * In html: <svg><use xlink:href="/img/svg-sprite.svg#my-icon"></use></svg>
 *
 * In css: svg { fill: BlanchedAlmond; }
 */

module.exports = function svgLocIconsTask(config, env){

    // svg config
    var svg = {
        src   : config.root + "/images/svg-loc-icons/**/*.svg",
        dest  : config.dest + "/images",
        filename : "svg-loc-icons.svg",
        svgmin: {},
        svgstore: {
            inlineSvg: false
        }
    };

    // register the watch
    quench.registerWatcher("svg-loc-icons", [
        config.root + "/images/svg-loc-icons/**/*.svg"
    ]);

    // generate svg sprite
    gulp.task("svg-loc-icons", function(){

        return gulp.src(svg.src)
            .pipe(quench.drano())
            .pipe(env.production( svgmin(svg.svgmin) ))
            .pipe(svgstore(svg.svgstore))
            .pipe(rename(svg.filename))
            .pipe(gulp.dest(svg.dest))
            .pipe(debug({title: "svg-loc-icons:"}));
    });
};

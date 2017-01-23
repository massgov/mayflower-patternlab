var gulp   = require("gulp"),
    quench = require("../quench.js"),
    rename = require("gulp-rename"),
    debug  = require("gulp-debug");

module.exports = function svg2twigTask(config, env){

    // copy files settings
    var svg2twig = {
        base: config.root + "/images/svg-icons",
        src: config.root + "/images/svg-icons/*.svg",
        dest: config.patternLabRoot + "/source/_patterns/01-atoms/05-icons"
    };

    // register the watch
    quench.registerWatcher("svg2twig", svg2twig.src);


    /* copy files */
    gulp.task("svg2twig", function(next) {

        return gulp.src(svg2twig.src, { base: svg2twig.base })
            .pipe(quench.drano())
            .pipe(rename({
                prefix: "svg-",
                extname: ".twig"
            }))
            .pipe(gulp.dest(svg2twig.dest))
            .pipe(debug({title: "svg2twig:"}));
    });
};

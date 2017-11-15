var gulp   = require("gulp"),
    quench = require("../quench.js"),
    debug  = require("gulp-debug");

module.exports = function copyTwigTask(config, env){

    // copy files settings
    var twig = {
        src: [
            config.patternLabRoot + "/source/_patterns/**/*.twig"
        ],
        dest: config.dest + "/assets"
    };

    // register the watch
    quench.registerWatcher("copyTwig", twig.src);


    /* copy files */
    gulp.task("copyTwig", function(next) {

        return gulp.src(twig.src, { base: config.root })
            .pipe(quench.drano())
            .pipe(gulp.dest(twig.dest))
            .pipe(debug({title: "copyTwig:"}));
    });
};

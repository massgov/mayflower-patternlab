var gulp   = require("gulp"),
    copy   = require("gulp-copy"),
    quench = require("../quench.js"),
    debug  = require("gulp-debug");

module.exports = function copyTwigTask(config, env){

    // copy files settings
    var twig = {
        src: [
            config.patternLabRoot + "/source/_patterns/**/*.twig"
        ],
        dest: "public/assets/patterns"
    };

    // register the watch
    quench.registerWatcher("copyTwig", twig.src);


    /* copy files */
    gulp.task("copyTwig", function(next) {

        return gulp.src(twig.src, { base: config.root })
            .pipe(quench.drano())
            .pipe(copy(twig.dest,{prefix: 2}))
            .pipe(gulp.dest(config.dest))
            .pipe(debug({title: "copyTwig:"}));
    });
};

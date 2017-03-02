var gulp   = require("gulp"),
    quench = require("../quench.js"),
    debug  = require("gulp-debug");

module.exports = function copyTask(config, env){

    // copy files settings
    var copy = {
        src: [
            config.root + "/fonts/**/*.*",
            config.root + "/images/**/*.*",
            config.root + "/js/templates/**/*.*",
            config.root + "/js/vendor/modernizr.js"
        ],
        dest: config.dest
    };

    // register the watch
    quench.registerWatcher("copy", copy.src);


    /* copy files */
    gulp.task("copy", function(next) {

        return gulp.src(copy.src, { base: config.root })
            .pipe(quench.drano())
            .pipe(gulp.dest(copy.dest))
            .pipe(debug({title: "copy:"}));
    });
};

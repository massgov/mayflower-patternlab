var gulp        = require("gulp");

module.exports = function s3Task(config){

    s3Config = {
        accessKeyId: config.local.s3_accessKeyId,
        secretAccessKey: config.local.s3_secretAccessKey,
        src: "~/tmp/mayflower/**"
    };

    var s3 = require('gulp-s3-upload')(s3config);

    /* compile application javascript */
    gulp.task("s3", function(){

        return gulp.src(s3Config.src)
          .pipe(s3({
            Bucket: 'mayflower.digital.mass.gov', //  Required
            ACL:    'public-read'       //  Needs to be user-defined
          }, {
            maxRetries: 5
          }))
          .pipe(debug({title: "s3: "}));
    });
};

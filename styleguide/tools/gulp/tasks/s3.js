var gulp        = require("gulp"),
    userHome    = require('user-home');

module.exports = function s3Task(config){

    s3Config = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : config.local.s3_accessKeyId,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : config.local.s3_secretAccessKey,
        bucket: process.env.AWS_BUCKET ? process.env.AWS_BUCKET : config.local.s3_bucket,
        src: userHome + "/tmp/mayflower/**"
    };

    var s3 = require('gulp-s3-upload')(s3Config);

    /* compile application javascript */
    gulp.task("s3", function(){

        return gulp.src(s3Config.src)
          .pipe(s3({
            Bucket: s3Config.bucket, //  Required
            ACL:    'public-read'    //  Needs to be user-defined
          }, {
            maxRetries: 5
          }));
    });
};

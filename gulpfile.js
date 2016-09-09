var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./typescripts/tsconfig.json");

gulp.task("copy-scripts", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("./www/js"));
});

gulp.task('watch', ['copy-scripts'], function() {
    gulp.watch('./typescripts/**/*.ts', ['copy-scripts']);
});
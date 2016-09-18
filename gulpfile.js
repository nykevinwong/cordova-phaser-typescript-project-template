var del = require('del');
var path = require('path');
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("./typescripts/tsconfig.json");

gulp.task("copy-scripts", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("./www/js"));
});

gulp.task('watch',['copy-scripts'], function () {
    var watcher = gulp.watch('./typescripts/**/*.ts', ['copy-scripts']);


  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      // Simulating the {base: 'src'} used with gulp.src in the scripts task
      var destFilePath = path.relative(path.resolve('www/js'), event.path);
      destFilePath = destFilePath.replace(".ts",".js");
      destFilePath = destFilePath.replace("typescripts\\","www\\js\\");
      console.log("deleting " + destFilePath);

      del.sync(destFilePath);
    }
  });
  
});
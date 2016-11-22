// Load plugins
var gulp = require( "gulp" );
var autoprefixer = require( "gulp-autoprefixer" );
var concatcss = require( "gulp-concat-css" );
var minifycss = require( "gulp-minify-css" );
var uglify = require( "gulp-uglify" );
var rename = require( "gulp-rename" );
var concat = require( "gulp-concat" );
var minifyHTML = require( "gulp-minify-html" );
var imagemin = require( "gulp-imagemin" );
var imageResize = require( "gulp-image-resize" );
var connect = require( "gulp-connect" );
var watch = require( "gulp-watch" );
var runSequence = require( "run-sequence" );
// var ghPages = require( "gulp-gh-pages" );

// Styles
gulp.task( "styles", function() {
  gulp.src( [ "src/css/**/*.css", "!src/css/**/gallery.css" ] )
    .pipe( concatcss( "home.css" ) )
    .pipe( autoprefixer( {
      browsers: [ "last 2 versions" ],
      cascade: false
    } ) )
    .pipe( rename( {
      suffix: ".min"
    } ) )
    .pipe( minifycss() )
    .pipe( gulp.dest( "dist/styles" ) );

  gulp.src( [ "src/css/gallery.css", "src/css/footer.css" ] )
    .pipe( concatcss( "gallery.css" ) )
    .pipe( autoprefixer( {
      browsers: [ "last 2 versions" ],
      cascade: false
    } ) )
    .pipe( rename( {
      suffix: ".min"
    } ) )
    .pipe( minifycss() )
    .pipe( gulp.dest( "dist/styles" ) );

} );

// Scripts
gulp.task( "scripts", function() {
  return gulp.src( "src/js/**/*.js" )
    .pipe( concat( "main.js" ) )
    .pipe( rename( {
      suffix: ".min"
    } ) )
    .pipe( uglify() )
    .pipe( gulp.dest( "dist/scripts" ) );
} );

// Templates
gulp.task( "html", function() {
  gulp.src( "src/index.html" )
    .pipe( minifyHTML( {
      quotes: true
    } ) )
    .pipe( gulp.dest( "dist/" ) );

  gulp.src( "src/pages/**/*.html" )
    .pipe( minifyHTML( {
      quotes: true
    } ) )
    .pipe( gulp.dest( "dist/pages" ) );
} );

// Images
gulp.task( "images", function() {
  return gulp.src( "src/images/**/*" )
    .pipe( imagemin( {
      progressive: true
    } ) )
    .pipe( imageResize( {
      width: 1024,
      upscale: false
    } ) )
    .pipe( gulp.dest( "dist/images/" ) );
} );

// Watch
gulp.task( "watch", function() {
  gulp.watch( "src/css/**/*.css", [ "styles" ] );
  gulp.watch( "src/js/**/*.js", [ "scripts" ] );
  gulp.watch( [
    "src/index.html",
    "src/pages/**/*.html"
  ], [ "html" ] );
} );

// Server
gulp.task( "webserver", function() {
  connect.server( {
    root: "dist",
    port: 8080,
    livereload: true
  } );
} );

// Live Reload
gulp.task( "livereload", function() {
  gulp.src( [ "dist/**/*" ] )
    .pipe( watch( [ "dist/**/*" ] ) )
    .pipe( connect.reload() );
} );

// Copy all needed files at the root level (dist)
gulp.task( "copy", function() {
  gulp.src( "src/images/**/*" )
    .pipe( gulp.dest( "dist/images" ) );

  gulp.src( "src/fonts/**/*" )
    .pipe( gulp.dest( "dist/fonts" ) );

  gulp.src( "node_modules/bootstrap/**/*" )
    .pipe( gulp.dest( "dist/node_modules/bootstrap" ) );

  gulp.src( "node_modules/jquery/**/*" )
    .pipe( gulp.dest( "dist/node_modules/jquery" ) );
} );

// Deploy to gh-pages
// gulp.task( "deploy", function() {
//   return gulp.src( "./dist/**/*" )
//     .pipe( ghPages( {
//       branch: "master"
//     } ) );
// } );

// Default task
gulp.task( "default", function( cb ) {
  runSequence( [ "copy", "watch" ], [ "styles", "scripts", "html", "images" ], [ "webserver", "livereload" ], cb );
} );
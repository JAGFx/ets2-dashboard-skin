const async = require( 'async' );

const gulp        = require( 'gulp' );
const run         = require( 'gulp-run-command' ).default;
const iconfont    = require( 'gulp-iconfont' );
const iconfontCss = require( 'gulp-iconfont-css' );
const consolidate = require( 'gulp-consolidate' );

const iconFontName      = 'icons';
const iconDist          = 'resources/dist/';
const iconSvgs          = 'resources/icons/svgs/*.svg';
const iconDistFontFiles = [
	iconDist + '*.svg',
	iconDist + '*.ttf',
	iconDist + '*.woff',
	iconDist + '*.woff2',
	iconDist + '*.eot',
	iconDist + '*.css'
];
const iconDestFiles     = 'public/icons/';
const runTimestamp      = Math.round( Date.now() / 1000 );

// --- Font icons
/*gulp.task('build:font', function(done){
 return gulp.src([iconSvgs])
 .pipe(iconfontCss({
 fontName: iconFontName, // required
 prependUnicode: true, // recommended option
 targetPath: 'icons.css'
 }))
 .pipe(iconfont({
 fontName: iconFontName,
 prependUnicode: false, // recommended option
 formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
 timestamp: runTimestamp
 }))
 /!*.on('glyphs', function(glyphs, options) {
 // CSS templating, e.g.
 console.log(glyphs, options);
 })*!/
 .pipe(gulp.dest(iconDestFiles));
 });*/

gulp.task( 'build:font:make', run( 'icon-font-generator resources/icons/svgs/*.svg -o resources/dist' ) );
gulp.task( 'build:font:place', () => {
	return gulp.src( iconDistFontFiles )
			   .pipe( gulp.dest( iconDestFiles ) );
} );
gulp.task( 'build:font', gulp.series( 'build:font:make', 'build:font:place' ) );

// --- Build app
gulp.task( 'build:dashboard', run( 'npm run dashboard:build' ) );
gulp.task( 'build:server', run( 'npm run server:build' ) );

// --- Build full package
gulp.task( 'build', gulp.series( 'build:font', 'build:dashboard', 'build:server' ) );

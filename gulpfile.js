const gulp = require( 'gulp' );
const run  = require( 'gulp-run-command' ).default;

const iconDist          = 'resources/dist/';
const iconDistFontFiles = [
	iconDist + '*.svg',
	iconDist + '*.ttf',
	iconDist + '*.woff',
	iconDist + '*.woff2',
	iconDist + '*.eot',
	iconDist + '*.css'
];
const iconDestFiles     = 'public/icons/';

// --- Font icons
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

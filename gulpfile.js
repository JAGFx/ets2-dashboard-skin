const gulp = require( 'gulp' );
const run  = require( 'gulp-run-command' ).default;
const fs   = require( 'fs-extra' );
const tar  = require( 'gulp-tar' );
const gzip = require( 'gulp-gzip' );
const path = require( 'path' );

const pkg = require( './package.json' );

// ---------------------------------------------
// --- Variables
// ---------------------------------------------

// --- Font icons
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

// --- Bundle
const filesToZip  = [
	'./dist',
	'./doc',
	'./server/dist',
	'./server/node_modules',
	'./server/package.json',
	'./server/package-lock.json',
	'./LICENSE',
	'./package.json',
	'./package-lock.json',
	'./README.md',
	'./screenshot.png'
];
const archiveName = `${ pkg.name }_v${ pkg.version }.tar`;
const archiveTemp = './build';
const destZip     = './';

// ---------------------------------------------
// --- Tasks
// ---------------------------------------------

// --- Font icons
gulp.task( 'build:font:init-folder', ( cb ) => {
	if ( !fs.existsSync( iconDist ) ) {
		fs.mkdirSync( iconDist );
		console.log( '📁  folder created:', iconDist );
	}
	cb();
} );
gulp.task( 'build:font:make', run( `icon-font-generator ${ iconSvgs } -o ${ iconDist }` ) );
gulp.task( 'build:font:place', () => {
	return gulp.src( iconDistFontFiles )
			   .pipe( gulp.dest( iconDestFiles ) );
} );
gulp.task( 'build:font', gulp.series( 'build:font:init-folder', 'build:font:make', 'build:font:place' ) );

// --- Build app
gulp.task( 'build:dashboard', run( 'npm run dashboard:build' ) );
gulp.task( 'build:server', run( 'npm run server:build' ) );

// --- Bundle
gulp.task( 'bundle:clean', ( cb ) => {
	if ( fs.existsSync( archiveTemp ) ) {
		fs.removeSync( archiveTemp );
		fs.mkdirSync( archiveTemp );
		console.log( `\t> Clean and empty created ${ archiveTemp }` );
	}
	cb();
} );
gulp.task( 'bundle:copy', ( cb ) => {
	filesToZip.forEach( function ( value ) {
		const destPath = path.resolve( archiveTemp, value.replace( '*', '' ) );
		console.log( `\t> Coping ${ value } to ${ destPath }` );
		
		fs.copySync( value, destPath );
	} );
	
	cb();
} );
gulp.task( 'bundle:gzip', () => {
	return gulp.src( archiveTemp + '/**' )
			   .pipe( tar( archiveName ) )
			   .pipe( gzip() )
			   .pipe( gulp.dest( destZip ) );
} );

// --- Build full package
gulp.task( 'build', gulp.series( 'build:font', 'build:dashboard', 'build:server' ) );
gulp.task( 'bundle', gulp.series( 'bundle:clean', 'bundle:copy', 'bundle:gzip' ) );

const gulp = require( 'gulp' );
const run  = require( 'gulp-run-command' ).default;
const fs   = require( 'fs-extra' );
const tar  = require( 'gulp-tar' );
const gzip = require( 'gulp-gzip' );
const path = require( 'path' );
const exec = require( 'child_process' ).execSync;

const pkg       = require( './package.json' );
const pkgServer = require( './server/package.json' );


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

// --- Resources copy
const srcTruckBrandSvgs  = 'resources/truck-brand/svgs/*.svg';
const destTruckBrandSvgs = 'public/img/Truck/brands/';

// --- Bundle
const filesToZip         = [
	'./doc',
	'./LICENSE',
	'./package.json',
	'./README.md',
	'./screenshot.png'
];
const sdkTelemetryName   = 'scsSDKTelemetry';
const binPath            = './bin/';
const bundleFileName     = `${ pkg.name }_v${ pkg.version }`;
const archiveTemp        = './build';
const destZip            = './bundle';
const nodeVersionTargets = pkgServer.pkg.targets;


// ---------------------------------------------
// --- Methods
// ---------------------------------------------


const getExeServerTargetNode = ( nodeTarget ) => {
	return `${ nodeTarget }-win`;
};

const getExeServerPathDest = ( nodeTarget ) => {
	return `${ archiveTemp }/${ nodeTarget }/${ bundleFileName }`;
};

const getTargetBuildPath = ( nodeTarget, filename ) => {
	return path.resolve( archiveTemp, nodeTarget, filename );
};

const getTargetBinPath = ( filename ) => {
	return path.resolve( binPath, filename );
};

const getArchiveName = ( nodeTarget ) => {
	return `${ bundleFileName }_${ nodeTarget }.tar`;
};


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

// --- Resources copy
gulp.task( 'build:resources:truck-brand', () => {
	return gulp.src( srcTruckBrandSvgs )
			   .pipe( gulp.dest( destTruckBrandSvgs ) );
} );

gulp.task( 'build:resources', gulp.series( 'build:resources:truck-brand' ) );

// --- Build app
gulp.task( 'build:dashboard', run( 'npm run dashboard:build' ) );
gulp.task( 'build:server', run( 'npm run server:build' ) );

// --- Bundle
gulp.task( 'bundle:clean', ( cb ) => {
	if ( fs.existsSync( archiveTemp ) ) {
		fs.removeSync( archiveTemp );
		fs.mkdirSync( archiveTemp );
		
		nodeVersionTargets.forEach( function ( currentTarget ) {
			const nvtPath = path.resolve( archiveTemp, currentTarget );
			
			fs.mkdirSync( nvtPath );
		} );
		
		console.log( `\t> Clean and empty created ${ archiveTemp }` );
	}
	cb();
} );
gulp.task( 'bundle:copy', ( cb ) => {
	nodeVersionTargets.forEach( function ( currentTarget ) {
		const scsTelemetryBinFileName   = `${ sdkTelemetryName }.${ currentTarget }`;
		const scsTelemetryBuildFileName = `${ sdkTelemetryName }.node`;
		
		filesToZip.forEach( function ( value ) {
			const destPath = getTargetBuildPath( currentTarget, value );
			console.log( `\t> Coping ${ value } to ${ destPath }` );
			
			fs.copySync( value, destPath );
		} );
		
		fs.copySync( getTargetBinPath( scsTelemetryBinFileName ),
			getTargetBuildPath( currentTarget, scsTelemetryBuildFileName ) );
	} );
	
	
	cb();
} );

gulp.task( 'bundle:server', ( cb ) => {
	nodeVersionTargets.forEach( function ( currentTarget ) {
		console.log( `\t> Generate *.exe file for ${ currentTarget }` );
		exec( `npx pkg ./server -t ${ getExeServerTargetNode( currentTarget ) } -o ${ getExeServerPathDest(
			currentTarget ) }` );
	} );
	
	console.log( `\t> All *.exe was generated` );
	cb();
} );

gulp.task( 'bundle:gzip', () => {
	let g = null;
	
	nodeVersionTargets.forEach( function ( currentTarget ) {
		g = gulp.src( getTargetBuildPath( currentTarget, './**' ) )
				.pipe( tar( getArchiveName( currentTarget ) ) )
				.pipe( gzip() )
				.pipe( gulp.dest( destZip ) );
	} );
	
	return g;
} );

// --- Build full package
gulp.task( 'build', gulp.series( 'build:font', 'build:resources', 'build:dashboard', 'build:server' ) );
gulp.task( 'bundle', gulp.series( 'bundle:clean', 'bundle:copy', 'bundle:server', 'bundle:gzip' ) );
gulp.task( 'bAndB', gulp.series( 'build', 'bundle' ) );

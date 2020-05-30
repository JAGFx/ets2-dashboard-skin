import gulp    from 'gulp';
import babel   from 'gulp-babel';
import plumber from 'gulp-plumber';

function watch() {
	gulp.watch( [ 'src/**/*.js', 'src/**/*.mjs' ], { cwd: './' }, gulp.series( build ) );
}

function build() {
	return gulp.src( [ 'src/**/*.js', 'src/**/*.mjs' ] )
			   .pipe( plumber() )
			   .pipe( babel( { presets: [ '@babel/env' ] } ) )
			   .pipe( gulp.dest( 'dist' ) );
}

exports.build = build;
exports.watch = watch;

exports.default = gulp.series( build );

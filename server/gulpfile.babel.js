import gulp    from 'gulp';
import babel   from 'gulp-babel';
import plumber from 'gulp-plumber';

function watch() {
	gulp.watch( 'index.js', { cwd: './' }, gulp.series( build ) );
}

function build() {
	return gulp.src( 'index.js' )
			   .pipe( plumber() )
			   .pipe( babel( { presets: [ '@babel/env' ] } ) )
			   .pipe( gulp.dest( 'dist' ) );
}

exports.build = build;
exports.watch = watch;

exports.default = gulp.series( build );

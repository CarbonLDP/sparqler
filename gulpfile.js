"use strict";

const del = require( "del" );

const gulp = require( "gulp" );
const jeditor = require( "gulp-json-editor" );
const sourcemaps = require( "gulp-sourcemaps" );
const sequence = require( "gulp-sequence" );
const ts = require( "gulp-typescript" );

const config = {
	dist: {
		path: "./dist",
	},
	src: {
		path: "./src",
		files: "./src/**/*.ts"
	}
};

gulp.task( "default", [ "build" ] );

gulp.task( "build", sequence( "clean:dist", "compile:typescript", "copy-package" ) );

gulp.task( "compile:typescript", () => {
	let tsProject = ts.createProject( "tsconfig.json", {
		"declaration": true,
	} );

	let tsResults = gulp.src( config.src.files )
			.pipe( sourcemaps.init() )
			.pipe( tsProject() )
		;

	tsResults.dts
		.pipe( gulp.dest( config.dist.path ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( config.dist.path ) )
		;
} );

gulp.task( "clean:dist", () => {
	del.sync( config.dist.path );
} );

gulp.task( "copy-package", () => {
	return gulp.src( "package.json" )
		.pipe( jeditor( ( json ) => {
			delete json.private;
			delete json.scripts;
			delete json.devDependencies;

			json.main = json.main.replace( "dist/", "" );
			json.typings = json.typings.replace( "dist/", "" );

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.path ) );
	;
} );

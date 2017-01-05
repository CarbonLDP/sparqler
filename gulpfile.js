"use strict";

const del = require( "del" );

const gulp = require( "gulp" );
const runSequence = require( "run-sequence" );

const karma = require( "karma" );
const intermediate = require( "gulp-intermediate" );
const jasmine = require( "gulp-jasmine" );
let SpecReporter = require( 'jasmine-spec-reporter' ).SpecReporter;

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const webpack = require( "webpack" );
const webpackConfig = require( "./webpack.config" );

const jeditor = require( "gulp-json-editor" );

const config = {
	source: {
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
		],
	},
	dist: {
		dir: "dist",
		typescript: "dist",
		all: "dist/**/*",
	},
	tests: {
		typescript: [
			"src/**/*.ts",
		],
	}
};

gulp.task( "default", [ "build" ] );

gulp.task( "build", ( done ) => {
	runSequence(
		"clean:dist",
		[ "bundle", "compile:typescript", "prepare:npm-package" ],
		done
	);
} );

gulp.task( "bundle", ( done ) => {
	const compiler = webpack( webpackConfig );

	compiler.run( ( error, stats ) => {
		if( error ) done( error );
		else done();
	} );
} );

gulp.task( "clean:dist", ( done ) => {
	return del( [ config.dist.all ], done );
} );

gulp.task( "compile:typescript", () => {
	let tsProject = ts.createProject( "tsconfig.json", {
		"declaration": true,
	} );

	let tsResults = gulp.src( config.source.typescript )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	tsResults.dts
		.pipe( gulp.dest( config.dist.typescript ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( config.dist.typescript ) )
		;
} );

gulp.task( "prepare:npm-package", ( done ) => {
	runSequence(
		[ "prepare:npm-package|copy:documentation", "prepare:npm-package|copy:package-json" ],
		done
	);
} );

gulp.task( "prepare:npm-package|copy:documentation", () => {
	return gulp.src( [
		"README.md",
		"CHANGELOG.md",
		"LICENSE",
	], { base: "./" } ).pipe( gulp.dest( config.dist.dir ) );
} );

gulp.task( "prepare:npm-package|copy:package-json", () => {
	return gulp.src( "package.json" )
		.pipe( jeditor( ( json ) => {
			delete json.private;
			delete json.scripts;
			delete json.devDependencies;

			json.main = json.main.replace( "dist/", "" );
			json.typings = json.typings.replace( "dist/", "" );

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.dir ) );
} );

gulp.task( "test", [ "test:browser", "test:node" ] );

gulp.task( "test:browser", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done ).start();
} );

gulp.task( "test:node", () => {
	let tsProject = ts.createProject( "tsconfig.json");

	let tsResults = gulp.src( config.tests.typescript )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	return tsResults.js
		.pipe( sourcemaps.write( ".", {
			includeContent: false,
			sourceRoot: __dirname + "/src/"
		} ) )
		.pipe( intermediate( {}, function( tempDir, cb ) {
			gulp.src( tempDir + "/**/*.spec.js" )
				.pipe( jasmine( {
					reporter: new SpecReporter( {
						summary: {
							displayStacktrace: true,
						}
					} ),
				} ) )
				.on( "end", cb );
		} ) );
} );

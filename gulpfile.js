"use strict";

const del = require( "del" );

const gulp = require( "gulp" );
const gulpUtil = require( "gulp-util" );
const runSequence = require( "run-sequence" );

const karma = require( "karma" );
const jasmine = require( "gulp-jasmine" );
const osTempDir = require( "os" ).tmpdir();
const uuid = require( "uuid" );
const path = require( "path" );
const filter = require( "gulp-filter" );

const SpecReporter = require( "jasmine-spec-reporter" ).SpecReporter;

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
	webpack( webpackConfig, ( error, stats ) => {
		if( error ) done( error );
		else {
			gulpUtil.log( stats.toString() );
			done( stats.hasErrors() ? "Webpack has errors" : null );
		}
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

gulp.task( "test", ( done ) => {
	runSequence( "test:node", "test:browser", done );
} );

gulp.task( "test:browser", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done ).start();
} );

gulp.task( "test:debug", ( done ) => {
	new karma.Server( {
		configFile: __dirname + "/karma.conf.js",
		autoWatch: true,
		singleRun: false,
	}, done ).start();
} );

gulp.task( "test:node", () => {
	let tsProject = ts.createProject( "tsconfig.json" );

	let tsResults = gulp.src( config.tests.typescript )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	let tempDir = path.join( osTempDir, uuid.v4() );

	// Register
	const tsConfigPaths = require( "tsconfig-paths" );
	tsConfigPaths.register( {
		baseUrl: tempDir,
		paths: { "sparqler/*": [ "/*" ] },
	} );

	require( "source-map-support/register" );

	return tsResults.js
		.pipe( sourcemaps.mapSources( ( sourcePath ) =>
			path.resolve( "./src/", sourcePath )
		) )
		.pipe( sourcemaps.write( ".", {
			includeContent: false,
		} ) )
		.pipe( gulp.dest( tempDir ) )
		.pipe( filter( "**/*.spec.js" ) )
		.pipe( jasmine( {
			reporter: new SpecReporter( {
				summary: {
					displayStacktrace: true,
				}
			} ),
			config: {
				helpers: [
					"test/es6-map.helper.js",
				]
			}
		} ) );
} );

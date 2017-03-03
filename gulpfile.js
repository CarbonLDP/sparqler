"use strict";

const del = require( "del" );

const gulp = require( "gulp" );
const runSequence = require( "run-sequence" );

const karma = require( "karma" );
const jasmine = require( "gulp-jasmine" );

const osTempDir = require( "os" ).tmpdir();
const uuid = require( "uuid" );
const path = require( "path" );
const filter = require( "gulp-filter" );

let SpecReporter = require( "jasmine-spec-reporter" ).SpecReporter;

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const webpack = require( "webpack" );

const jeditor = require( "gulp-json-editor" );

const Dgeni = require( "dgeni" );

const buildSemanticUI = require( "./build/docs/src/semantic/tasks/build" );
const htmlReplace = require( "gulp-html-replace" );
const imagemin = require( "gulp-imagemin" );
const htmlmin = require( "gulp-htmlmin" );

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
	const compiler = webpack( require( "./webpack.config" ) );

	compiler.run( ( error, stats ) => {
		if( error ) done( error );
		else done();
	} );
} );

gulp.task( "clean:dist", () => {
	return del( [ config.dist.all ] );
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
	let tsProject = ts.createProject( "tsconfig.json" );

	let tsResults = gulp.src( config.tests.typescript )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	let tempDir = path.join( osTempDir, uuid.v4() );

	return tsResults.js
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( tempDir ) )
		.pipe( filter( "**/*.spec.js" ) )
		.pipe( jasmine( {
			reporter: new SpecReporter( {
				summary: {
					displayStacktrace: true,
				}
			} ),
		} ) );
} );

gulp.task( "semantic-ui:build", buildSemanticUI );

gulp.task( "docs:build|prod", ( done ) => {
	process.env.NODE_ENV = "prod";

	runSequence(
		[ "semantic-ui:build", "docs:generate-html", "docs:images" ],
		[ "docs:bundle", "docs:html-replace" ],
		[ "docs:html-min" ],
		done
	);
} );

gulp.task( "docs:build|dev", ( done ) => {
	process.env.NODE_ENV = "dev";

	runSequence(
		[ "semantic-ui:build", "docs:generate-html", "docs:images" ],
		"docs:bundle",
		done
	);
} );

gulp.task( "docs:clean-html", () => {
	return del( [
		"docs/**", "!docs",
		"!docs/styles", "!docs/styles/**",
		"!docs/fonts", "!docs/fonts/**",
		"!docs/images", "!docs/images/**",
		"!docs/scripts", "!docs/scripts/**",
		"!docs/scripts", "!docs/scripts/**",
		"!docs/favicon.png",
	] );
} );

gulp.task( "docs:generate-html", [ "docs:clean-html" ], () => {
	const dgeni = new Dgeni( [ require( "./build/docs/config" ) ] );
	return dgeni.generate();
} );

gulp.task( "docs:html-min", function() {
	return gulp.src( "docs/**/*.html" )
		.pipe( htmlmin( {
			collapseWhitespace: true,
			removeComments: true
		} ) )
		.pipe( gulp.dest( "docs" ) );
} );

gulp.task( "docs:clean-bundle", () => {
	return del( [
		"docs/styles/**",
		"docs/scripts/**",
		"docs/fonts/**",
	] );
} );

gulp.task( "docs:bundle", [ "docs:clean-bundle" ], ( done ) => {
	let config = process.env.NODE_ENV === "prod" ?
		require( "./build/docs/build/webpack.prod" ) :
		require( "./build/docs/build/webpack.dev" );

	const compiler = webpack( config );

	compiler.run( ( error ) => {
		if( error ) done( error );
		else done();
	} );
} );

gulp.task( "docs:html-replace", () => {
	return gulp.src( "docs/**/*.html" )
		.pipe( htmlReplace( {
			"css": "styles/styles.min.css",
			"js": "scripts/bundle.min.js"
		} ) )
		.pipe( gulp.dest( "docs/" ) );
} );

gulp.task( "docs:clean-images", () => {
	return del( [ "docs/images/**" ] );
} );

gulp.task( "docs:images", () => {
	return gulp.src( "build/docs/src/images/**" )
		.pipe( imagemin() )
		.pipe( gulp.dest( "docs/images" ) );
} );

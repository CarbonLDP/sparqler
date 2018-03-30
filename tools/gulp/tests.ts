import fs from "fs";
import os from "os";
import path from "path";

import del from "del";
import karma from "karma";
import gulp from "gulp";
import jasmine from "gulp-jasmine";
import ts from "gulp-typescript";
import sourcemaps from "gulp-sourcemaps";
import filter from "gulp-filter";
import { SpecReporter } from "jasmine-spec-reporter";

import * as tsPaths from "tsconfig-paths";
import sourceMapSupport from "source-map-support";

import { CONFIG } from "./common";


export function testBrowser( done ) {
	const server = new karma.Server( {
		configFile: path.resolve( "karma.conf.js" ),
		singleRun: true,
	}, done );

	server.start();
}

export function testWatch( done ) {
	const server = new karma.Server( {
		configFile: path.resolve( "karma.conf.js" ),
		autoWatch: true,
		singleRun: false,
	}, done );

	server.start();
}

export function testNode() {
	const tsProject = ts.createProject( "tsconfig.json" );

	const files = CONFIG.src.files
		.filter( path => ! path.startsWith( "!" ) )
	;

	const tsResults = gulp.src( files )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	const tempDir = fs.mkdtempSync( path.join( os.tmpdir(), "test-jasmine-" ) );

	sourceMapSupport.install();
	tsPaths.register( {
		baseUrl: tempDir,
		paths: { "sparqler/*": [ "/*" ] },
	} );

	const stream = tsResults.js
		.pipe( sourcemaps.write( ".", {
			sourceRoot: path.resolve( "./src" ),
			includeContent: false,
		} ) )
		.pipe( gulp.dest( tempDir ) as NodeJS.ReadWriteStream )
		.pipe( filter( "**/*.spec.js" ) )
		.pipe( jasmine( {
			reporter: new SpecReporter( {
				summary: {
					displayStacktrace: true,
				}
			} ),
		} ) );

	const delTemp = () => del.sync( tempDir, { force: true } );
	stream.on( "jasmineDone", delTemp );
	stream.on( "error", delTemp );

	return stream;
}

export const test = gulp.series( testNode, testBrowser );

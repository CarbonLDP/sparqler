import del from "del";
import fs from "fs";
import gulp from "gulp";
import filter from "gulp-filter";
import jasmine from "gulp-jasmine";
import sourcemaps from "gulp-sourcemaps";
import ts from "gulp-typescript";
import { SpecReporter } from "jasmine-spec-reporter";
import karma from "karma";
import os from "os";
import path from "path";
import sourceMapSupport from "source-map-support";

import { CONFIG } from "./common";


export function testBrowser( done:( error?:any ) => void ) {
	const server = new karma.Server( {
		configFile: path.resolve( "karma.conf.js" ),
		singleRun: true,
	}, done );

	server.start();
}

export function testWatch( done:( error?:any ) => void ) {
	const server = new karma.Server( {
		configFile: path.resolve( "karma.conf.js" ),
		autoWatch: true,
		singleRun: false,
	}, done );

	server.start();
}

export function testNode() {
	const tsProject = ts.createProject( "tsconfig.json" );

	const tsResults = gulp.src( CONFIG.test.files )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	const tempDir = fs.mkdtempSync( path.join( os.tmpdir(), "test-jasmine-" ) );

	sourceMapSupport.install();

	const stream = tsResults.js
		.pipe<NodeJS.ReadWriteStream>( sourcemaps.write( ".", {
			sourceRoot: path.resolve( "./" ),
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
		} ) );

	const delTemp = () => del.sync( tempDir, { force: true } );
	stream.on( "jasmineDone", delTemp );
	stream.on( "error", delTemp );

	return stream;
}

export const test = gulp.series( testNode, testBrowser );

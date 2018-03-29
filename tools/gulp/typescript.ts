import gulp from "gulp";
import ts from "gulp-typescript";
import replace from "gulp-replace";
import sourcemaps from "gulp-sourcemaps";
import path from "path";

import {
	cleaner,
	CONFIG,
	tasker,
} from "./common";

const compiler = ( dist:string, options:ts.Settings ) => tasker( () => {
	const tsProject = ts.createProject( "tsconfig.json", options );

	const tsResults = gulp.src( CONFIG.src.files )
		.pipe( replace( /(import[\s\S]*?from +")sparqler\/(.*?)(";)/gm, function( match, $1, $2, $3 ) {
			const fileDir = path.dirname( this.file.relative );
			const relativePath = path.relative( fileDir, $2 );
			return `${ $1 }./${ relativePath }${ $3 }`;
		} ) )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
	;

	return tsResults.js
		.pipe( sourcemaps.write( ".", { sourceRoot: "../src" } ) )
		.pipe( gulp.dest( dist ) )
		;
} );

const baseSettings:ts.Settings = {
	module: "es2015",
	target: "es5",
	importHelpers: true,

};

export const cleanESM5 = cleaner( CONFIG.dist.esm5 )( "cleanESM5" );
export const compileESM5 = compiler( CONFIG.dist.esm5, { ...baseSettings } )( "compileESM5" );
export const buildESM5 = gulp.series( cleanESM5, compileESM5 );

export const cleanESM2015 = cleaner( CONFIG.dist.esm2015 )( "cleanESM2015" );
export const compileESM2015 = compiler( CONFIG.dist.esm2015, { ...baseSettings, target: "es2015" } )( "compileESM2015" );
export const buildESM2015 = gulp.series( cleanESM2015, compileESM2015, );

export const cleanCJS = cleaner( CONFIG.dist.cjs )( "cleanCJS" );
export const compileCJS = compiler( CONFIG.dist.cjs, { ...baseSettings, module: "commonjs" } )( "compileCJS" );
export const buildCJS = gulp.series( cleanESM5, compileCJS, );

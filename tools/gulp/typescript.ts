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


const compiler = ( dist:string, module:"es2015" | "es5" | "commonjs", target:"es2015" | "es5" ) => tasker( () => {
	const tsProject = ts.createProject( "tsconfig.json", {
		module,
		target,
	} );

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
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( dist ) )
		;
} );


export const compileESM2015 = gulp.series(
	cleaner( CONFIG.dist.esm2015 )( "cleanESM2015" ),
	compiler( CONFIG.dist.esm2015, "es2015", "es2015" )( "compileESM2015" ),
);

export const compileESM5 = gulp.series(
	cleaner( CONFIG.dist.esm5 )( "cleanESM5" ),
	compiler( CONFIG.dist.esm5, "es2015", "es5" )( "compileESM5" ),
);

export const compileCJS = gulp.series(
	cleaner( CONFIG.dist.cjs )( "cleanCJS" ),
	compiler( CONFIG.dist.cjs, "commonjs", "es5" )( "compileCJS" ),
);

export const compileAll = gulp.parallel(
	compileCJS,
	compileESM2015,
	compileESM5,
);

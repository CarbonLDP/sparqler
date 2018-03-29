import path from "path";

import gulp from "gulp";
import jsonEditor from "gulp-json-editor";

import {
	cleaner,
	CONFIG
} from "./common";


export function copyMarkdowns() {
	const MDs = [
		"README.md",
		"CHANGELOG.md",
		"LICENSE",
	];

	return gulp.src( MDs, { base: "./" } )
		.pipe( gulp.dest( CONFIG.dist.dir ) );
}

export function copyPackage() {
	const mainDir:string = path.basename( CONFIG.dist.cjs );
	const moduleDir:string = path.basename( CONFIG.dist.esm5 );
	const es2015Dir:string = path.basename( CONFIG.dist.esm2015 );

	return gulp.src( "package.json" )
		.pipe( jsonEditor( {
			private: void 0,
			scripts: void 0,
			devDependencies: void 0,
			main: `${ mainDir }/index.js`,
			module: `${ moduleDir }/index.js`,
			es2015: `${ es2015Dir }/index.js`,
		} ) )
		.pipe( gulp.dest( CONFIG.dist.dir ) );
}

export const cleanUMDs = gulp.parallel(
	cleaner( `${ CONFIG.dist.cjs }umd.js` )( "clean:umd-cjs" ),
	cleaner( `${ CONFIG.dist.cjs }umd.js.map` )( "clean:umd_map-cjs" ),
	cleaner( `${ CONFIG.dist.esm5 }umd.js` )( "clean:umd-esm5" ),
	cleaner( `${ CONFIG.dist.esm5 }umd.js.map` )( "clean:umd_map-esm5" ),
	cleaner( `${ CONFIG.dist.esm2015 }umd.js` )( "clean:umd-esm2015" ),
	cleaner( `${ CONFIG.dist.esm2015 }umd.js.map` )( "clean:umd_map-esm2015" )
);


export const preparePackage = gulp.parallel(
	copyMarkdowns,
	copyPackage,
	cleanUMDs,
);

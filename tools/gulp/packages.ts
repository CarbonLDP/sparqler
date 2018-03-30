import path from "path";

import gulp from "gulp";
import jsonEditor from "gulp-json-editor";
import glob from "glob";
import del from "del";
import fs from "fs";

import { CONFIG } from "./common";


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
	const mainDir:string = path.relative( CONFIG.dist.dir, CONFIG.dist.cjs );
	const moduleDir:string = path.relative( CONFIG.dist.dir, CONFIG.dist.esm5 );
	const es2015Dir:string = path.relative( CONFIG.dist.dir, CONFIG.dist.esm2015 );
	const typesDir:string = path.relative( CONFIG.dist.dir, CONFIG.dist.types );

	return gulp.src( "package.json" )
		.pipe( jsonEditor( {
			private: void 0,
			scripts: void 0,
			devDependencies: void 0,
			main: path.join( mainDir, "index.js" ),
			module: path.join( moduleDir, "index.js" ),
			es2015: path.join( es2015Dir, "index.js" ),
			typings: path.join( typesDir, "index.d.ts" ),
		}, {
			keep_array_indentation: true,
			end_with_newline: true,
		} ) )
		.pipe( gulp.dest( CONFIG.dist.dir ) );
}


export async function makeDirPackages() {
	const directories:string[] = glob
		.sync( `${ CONFIG.src.dir }/*/**/index.ts` )
		.map( file => file.replace( "/index.ts", "" ) )
		.sort()
	;

	for( const srcEntry of directories ) {
		const relativeEntry:string = path.relative( CONFIG.src.dir, srcEntry );
		const distEntry:string = path.join( CONFIG.dist.dir, relativeEntry );

		del.sync( distEntry );
		fs.mkdirSync( distEntry );

		const mainDir:string = path.join( CONFIG.dist.cjs, relativeEntry );
		const moduleDir:string = path.join( CONFIG.dist.esm5, relativeEntry );
		const es2015Dir:string = path.join( CONFIG.dist.esm2015, relativeEntry );
		const typesDir:string = path.join( CONFIG.dist.types, relativeEntry );

		const body = JSON.stringify( {
			name: `sparqler/${ relativeEntry }`,
			main: path.join( path.relative( distEntry, mainDir ), "index.js" ),
			module: path.join( path.relative( distEntry, moduleDir ), "index.js" ),
			es2015: path.join( path.relative( distEntry, es2015Dir ), "index.js" ),
			typings: path.join( path.relative( distEntry, typesDir ), "index.d.ts" ),
		}, null, 2 );

		fs.writeFileSync( path.join( distEntry, "package.json" ), body );
	}
}


export const preparePackage = gulp.parallel(
	copyMarkdowns,
	copyPackage,
	makeDirPackages,
);

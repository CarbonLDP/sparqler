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
	const mainDir:string = path.basename( CONFIG.dist.cjs );
	const moduleDir:string = path.basename( CONFIG.dist.esm5 );
	const es2015Dir:string = path.basename( CONFIG.dist.esm2015 );
	const typesDir:string = path.basename( CONFIG.dist.types );

	return gulp.src( "package.json" )
		.pipe( jsonEditor( {
			private: void 0,
			scripts: void 0,
			devDependencies: void 0,
			main: `${ mainDir }/index.js`,
			module: `${ moduleDir }/index.js`,
			es2015: `${ es2015Dir }/index.js`,
			typings: `${ typesDir }/index.d.ts`,
		} ) )
		.pipe( gulp.dest( CONFIG.dist.dir ) );
}


export async function makeDirPackages() {
	const directories:string[] = glob
		.sync( `${ CONFIG.src.dir }**/index.ts` )
		.map( file => file.replace( "index.ts", "" ) )
		.map( file => file.replace( "src/", "" ) )
		.filter( file => ! ! file )
		.sort()
	;

	for( const dir of directories ) {
		del.sync( `${ CONFIG.dist.dir }${ dir }` );
		fs.mkdirSync( `${ CONFIG.dist.dir }${ dir }` );

		const currentDir:string = `${ CONFIG.dist.dir }${ dir }`;

		const mainDir:string = `${ path.basename( CONFIG.dist.cjs ) }/${ dir }`;
		const moduleDir:string = `${ path.basename( CONFIG.dist.esm5 ) }/${ dir }`;
		const es2015Dir:string = `${ path.basename( CONFIG.dist.esm2015 ) }/${ dir }`;
		const typesDir:string = `${ path.basename( CONFIG.dist.types ) }/${ dir }`;

		const body = JSON.stringify( {
			name: `sparqler/${ dir }`,
			main: `${ path.relative( dir, mainDir ) }/index.js`,
			module: `${ path.relative( dir, moduleDir ) }/index.js`,
			es2015: `${ path.relative( dir, es2015Dir ) }/index.js`,
			typings: `${ path.relative( dir, typesDir ) }/index.d.ts`,
		}, null, 2 );

		fs.writeFileSync( `${ currentDir }package.json`, body );
	}
}


export const preparePackage = gulp.parallel(
	copyMarkdowns,
	copyPackage,
	makeDirPackages,
);

import gulp from "gulp";
import path from "path";
import { rollup } from "rollup";
import resolve from "rollup-plugin-node-resolve";
// @ts-ignore
import replace from "rollup-plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";

import { CONFIG } from "./common";
import { cleanESM5, cleanESM5UMD, generateESM5 } from "./typescript";


export async function bundleUMD() {
	const distBundle:string = `${ CONFIG.dist.esm5 }${ path.basename( CONFIG.src.bundle, ".ts" ) }.js`;

	const bundle = await rollup( {
		input: distBundle,
		plugins: [
			replace( {
				"process.env.NODE_ENV": JSON.stringify( "production" ),
			} ),
			resolve( {
				browser: true,
				module: true,
				main: true,
			} ),
			sourcemaps(),
		],
	} );

	await bundle.write( {
		file: `${ CONFIG.dist.bundle }sparqler.umd.js`,
		format: "umd",
		amd: { id: "sparqler" },
		name: "sparqler",
		sourcemap: true,
	} );
}


export const bundle = gulp.series(
	cleanESM5,
	generateESM5,
	bundleUMD,
	cleanESM5UMD,
);

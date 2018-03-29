import path from "path";
import gulp from "gulp";
import { rollup } from "rollup";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

import {
	CONFIG,
	tasker
} from "./common";
import { buildESM5 } from "./typescript";


const umdBundler = tasker( async () => {
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
} );

export const bundleUMD = umdBundler( "bundleUMD" );


export const bundle = gulp.series( buildESM5, bundleUMD );

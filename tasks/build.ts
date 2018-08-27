import fs from "fs";
import gulp from "gulp";

import { cleaner, CONFIG } from "./common";
import { preparePackage } from "./packages";
import { bundle } from "./rollup";

import { generateCJS, generateESM2015, generateTypes } from "./typescript";


async function createDist() {
	fs.mkdirSync( CONFIG.dist.dir );
}

export const cleanDist = cleaner( CONFIG.dist.dir )( "cleanDist" );


export const build = gulp.series(
	cleanDist,
	createDist,
	gulp.parallel(
		generateCJS,
		generateESM2015,
		generateTypes,
		bundle,
		preparePackage,
	),
);

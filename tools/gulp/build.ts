import fs from "fs";

import gulp from "gulp";

import {
	generateCJS,
	generateESM2015,
	generateTypes,
} from "./typescript";
import { bundle } from "./rollup";
import {
	cleaner,
	CONFIG
} from "./common";
import { preparePackage } from "./packages";


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

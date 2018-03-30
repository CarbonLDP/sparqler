import fs from "fs";

import gulp from "gulp";

import {
	buildCJS,
	buildESM2015,
	buildTypes,
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
		buildCJS,
		buildESM2015,
		buildTypes,
		bundle,
		preparePackage,
	),
);

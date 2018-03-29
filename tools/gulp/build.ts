import gulp from "gulp";

import {
	buildCJS,
	buildESM2015,
} from "./typescript";
import { bundle } from "./rollup";
import {
	cleaner,
	CONFIG
} from "./common";
import { preparePackage } from "./packages";


export const cleanDist = cleaner( CONFIG.dist.dir )( "cleanDist" );


export const build = gulp.series(
	cleanDist,
	gulp.parallel(
		buildCJS,
		buildESM2015,
		bundle,
	),
	preparePackage,
);

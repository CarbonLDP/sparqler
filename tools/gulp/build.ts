import gulp from "gulp";

import { compileAll } from "./typescript";


export const build = gulp.parallel(
	compileAll
);

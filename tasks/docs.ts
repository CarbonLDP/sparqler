import gulp from "gulp";
import DocsEngine from "carbonldp-ts-docs-engine";
import path from "path";
import del = require("del");
import fs from "fs";

const projectRootDir:string = path.resolve( __dirname, "../" );
const sourceDir:string = path.resolve( projectRootDir, "src/" );
const outputDir:string = path.resolve( projectRootDir, "docs/" );
const descriptionTemplate:string = path.join(projectRootDir, "build/docs/templates/documentation-description.njk");

export const docsClean:gulp.TaskFunction = () =>
	del( [
		`${outputDir}/**`, `!${outputDir}`,
		`!${outputDir}/templates`, `!${outputDir}/templates/**`,
	] );
docsClean.displayName = "docs:clean";

export const generateDocumentation:( env:"development" | "production") => gulp.TaskFunction = env => {
	const fn:gulp.TaskFunction = async () => {

		const options:DocsEngine.Options = {
			src: sourceDir,
			out: outputDir,
			mode: env,
			logLevel: "info",
			descriptionTemplate: descriptionTemplate,
			npmName: "sparqler",
			name: "SPARQLER",
			mainClass: "SPARQLER",
		};
		return DocsEngine.generate( options );
	};
	fn.displayName = "docs:generate";
	return fn;
};

export const docsBuildDev:gulp.TaskFunction = gulp.series(
	docsClean,
	generateDocumentation("development")
);
docsBuildDev.displayName = "docs:build|dev";

export const docsBuildProd:gulp.TaskFunction = gulp.series(
	docsClean,
	generateDocumentation("production")
);
docsBuildProd.displayName = "docs:build|prod";





import path = require( "path" );
import { Package } from "dgeni";
// Processors
import { navigationProcessor } from "./processors/navigation";
import { normalizeDocsProcessor } from "./processors/normalizeDocs";
import { privateFilterProcessor } from "./processors/private-filter";
import { multipleExports } from "./processors/multipleExports";
// Config marked lib
import "./rendering/config-marked";
// Nunjucks filters
import { highlightFilter } from "./rendering/filters/highlight";
import { linkifyFilter } from "./rendering/filters/linkify";
import { nullifyEmptyFilter } from "./rendering/filters/nullifyEmpty";
// Nunjucks tags
import { highlightTag } from "./rendering/tags/highlight";
// Dgeni inline tags
import { paramInLineTag } from "./inline-tags-def/paramInlineTag"

// Project configuration.
const projectRootDir = path.resolve( __dirname, "./../../.." );
const sourceDir = path.resolve( projectRootDir, "src/" );
const outputDir = path.resolve( projectRootDir, "docs/" );
const templateDir = path.resolve( __dirname, "./templates" );


const apiDocsPackage = new Package( "sparqler-api-docs", [
	require( "dgeni-packages/jsdoc" ),
	require( "dgeni-packages/nunjucks" ),
	require( "dgeni-packages/typescript" ),
	require( "dgeni-packages/links" ),
	require( "dgeni-packages/git" ),
] )

	.processor( privateFilterProcessor )
	.processor( navigationProcessor )
	.processor( normalizeDocsProcessor )
	.processor( multipleExports )

	.config( function( log ) {
		log.level = "info";
	} )

	// Configure the processor for reading files from the file system.
	.config( function( readFilesProcessor, writeFilesProcessor ) {
		readFilesProcessor.basePath = sourceDir;
		readFilesProcessor.$enabled = false; // disable for now as we are using readTypeScriptModules

		writeFilesProcessor.outputFolder = outputDir;
	} )

	// Configure the output path for written files (i.e., file names).
	.config( function( computePathsProcessor, computeIdsProcessor ) {

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "module", "class", "interface", "function", "enum", "type-alias", "const" ],
			pathTemplate: "/${id}/",
			outputPathTemplate: "${id}/index.html",
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "index" ],
			pathTemplate: ".",
			outputPathTemplate: "${id}.html",
		} );

		computeIdsProcessor.idTemplates.push( {
			docTypes: [ "index" ],
			idTemplate: "index",
			// getAliases: () => [ "index" ],
		} );
	} )

	// Configure the processor for understanding TypeScript.
	.config( function( readTypeScriptModules ) {
		readTypeScriptModules.basePath = sourceDir;
		readTypeScriptModules.hidePrivateMembers = false;
		// readTypeScriptModules.sortClassMembers = true;

		// Entry points for docs generation.
		readTypeScriptModules.sourceFiles = [
			{
				include: "**/*.ts",
				exclude: "**/*.spec.ts",
			},
		];
	} )

	// Configure the processor to accept the '@param' tag.
	.config(function (inlineTagProcessor, getInjectables) {
		inlineTagProcessor.inlineTagDefinitions.push( ...getInjectables([
			paramInLineTag
		]))
	})

	// Configure processor for finding nunjucks templates.
	.config( function( templateFinder ) {
		// Where to find the templates for the doc rendering
		templateFinder.templateFolders = [ templateDir, path.resolve( templateDir, "partials" ), path.resolve( templateDir, "macros" ) ];

		// Standard patterns for matching docs to templates
		templateFinder.templatePatterns = [
			"${ doc.docType }.template.njk",
			"${ doc.docType }.macro.njk",
		];
	} )
	.config( function( templateEngine, getInjectables ) {
		templateEngine.filters.push( ...getInjectables( [
			linkifyFilter,
			nullifyEmptyFilter,
			highlightFilter,
		] ) );
		templateEngine.tags.push( ...getInjectables( [
			highlightTag,
		] ) );
	} )


export = apiDocsPackage;

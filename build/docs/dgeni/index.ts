import path = require( "path" );
import { Package, } from "dgeni";
// Processors
import { extendsTypescriptProcessor } from "./processors/extends-typescript";
import { navigationProcessor } from "./processors/navigation";
import { normalizeDocsProcessor } from "./processors/normalizeDocs";
import { privateFilterProcessor } from "./processors/private-filter";
// Nunjucks filters
import { linkify } from "./rendering/filters/linkify";
import { nullifyEmpty } from "./rendering/filters/nullifyEmpty";
// Custom tags
import { generics } from "./tags-def/generics";
import { module } from "./tags-def/module";

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
] )

	.processor( privateFilterProcessor )
	.processor( navigationProcessor )
	.processor( extendsTypescriptProcessor )
	.processor( normalizeDocsProcessor )

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
			docTypes: [ "module" ],
			pathTemplate: "/${id}/",
			outputPathTemplate: "${id}/index.html",
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "class", "interface" ],
			pathTemplate: "/${id}/",
			outputPathTemplate: "${id}/index.html",
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "member" ],
			pathTemplate: "${containerDoc.path}#${name}",
			getOutputPath: () => {
			},
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "enum", "type-alias" ],
			pathTemplate: "${moduleDoc.path}#${name}",
			getOutputPath: () => {
			},
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

	// Configure custom JsDoc tags.
	.config( function( parseTagsProcessor ) {
		parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat( [
			{ name: "docs-private" },
		] );
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


	// Configure processor for finding nunjucks templates.
	.config( function( templateFinder ) {
		// Where to find the templates for the doc rendering
		templateFinder.templateFolders = [ templateDir, path.resolve( templateDir, "partials" ) ];

		// Standard patterns for matching docs to templates
		templateFinder.templatePatterns = [
			// '${ doc.template }',
			// '${ doc.id }.${ doc.docType }.template.html',
			// '${ doc.id }.template.html',
			// '${ doc.docType }.template.html',
			// '${ doc.id }.${ doc.docType }.template.js',
			// '${ doc.id }.template.js',
			// '${ doc.docType }.template.js',
			// '${ doc.id }.${ doc.docType }.template.json',
			// '${ doc.id }.template.json',
			// '${ doc.docType }.template.json',
			"${ doc.docType }.template.njk",
		];
	} )
	.config( function( templateEngine, getInjectables ) {
		templateEngine.filters.push( ...getInjectables( [
			linkify,
			nullifyEmpty,
		] ) );
	} )
	.config( function( parseTagsProcessor, getInjectables ) {
		parseTagsProcessor.tagDefinitions.push( ...getInjectables( [
			module,
			generics,
		] ) );
	} );


export = apiDocsPackage;

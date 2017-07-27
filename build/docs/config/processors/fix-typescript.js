const path = require( 'path' );

module.exports = function fixTypeScript( tsParser, modules, getFileInfo, ignoreTypeScriptNamespaces, getExportAccessibility, getContent, createDocMessage, log ) {

	return {
		$runAfter: [ 'files-read' ],
		$runBefore: [ 'parsing-tags' ],
		$process: function( docs ) {


			// let basePath = path.resolve( this.basePath );
			// let filesPaths = expandSourceFiles( this.sourceFiles, basePath );
			// let parseInfo = tsParser.parse( filesPaths, this.basePath );
			// let moduleSymbols = parseInfo.moduleSymbols;
		}
	};

	function expandSourceFiles( sourceFiles, basePath ) {
		let filePaths = [];
		sourceFiles.forEach( function( sourcePattern ) {
			if( sourcePattern.include ) {
				let include = glob.sync( sourcePattern.include, { cwd: basePath } );
				let exclude = [];
				if( sourcePattern.exclude ) {
					exclude = glob.sync( sourcePattern.exclude, { cwd: basePath } );
				}
				filePaths = filePaths.concat( _.difference( include, exclude ) );
			} else {
				filePaths = filePaths.concat( glob.sync( sourcePattern, { cwd: basePath } ) );
			}
		} );
		return filePaths;
	}
};
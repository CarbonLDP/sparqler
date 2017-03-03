const path = require( "path" );

module.exports = function fixIDs() {
	return {
		$runAfter: [ "tags-extracted" ],
		$runBefore: [ "processing-docs" ],
		$process: function( docs ) {
			return docs.forEach( doc => {
				fixID( doc );
				if( doc.members ) doc.members.forEach( fixID );
			} );
		}
	};

	function fixID( doc ) {// if( doc.docType === "module" && doc.name === "PatternBuilder" ) debugger;
		if( ! doc.id || doc.id.startsWith( "/" ) ) {
			doc.id = doc.fileInfo.projectRelativePath.slice( 0, - 3 );
			if( [ "class", "interface" ].includes( doc.docType ) ) doc.id += "/" + doc.name;
			if( [ "function", "member" ].includes( doc.docType ) ) doc.id += "." + doc.name;
		}
		if( [ "type-alias" ].includes( doc.docType ) ) doc.id = doc.moduleDoc.id + "#" + doc.name;
	}
};

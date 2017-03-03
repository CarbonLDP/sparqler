const path = require( "path" );

const INTERNAL_METHODS = [];

module.exports = function privateFilter() {
	return {
		$runAfter: [ "tags-extracted" ],
		$runBefore: [ "processing-docs" ],
		$process: function( docs ) {
			docs = docs.filter( doc => {
				if( doc.members ) doc.members = doc.members.filter( member => ! hasDocsPrivateTag( member ) );
				return ! hasDocsPrivateTag( doc );
			} );
			return docs;
		}
	};
};

function hasDocsPrivateTag( element ) {
	let tags = element.tags && element.tags.tags;
	return tags ? tags.find( tag => tag.tagName == "docs-private" ) : false;
}
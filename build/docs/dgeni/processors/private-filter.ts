import {
	DocCollection,
	Processor,
} from "dgeni";

function hasDocsPrivateTag( element ) {
	let tags = element.tags && element.tags.tags;
	return tags ? tags.find( tag => tag.tagName == "docs-private" ) : false;
}

export class PrivateFilter implements Processor {
	name = "privateFilterProcessor";

	$runAfter = [ "tags-extracted" ];
	$runBefore = [ "processing-docs" ];

	$process( docs:DocCollection ) {
		return docs.filter( doc => {
			if( doc.members ) doc.members = doc.members.filter( member => ! hasDocsPrivateTag( member ) );
			return ! hasDocsPrivateTag( doc );
		} );
	}

}
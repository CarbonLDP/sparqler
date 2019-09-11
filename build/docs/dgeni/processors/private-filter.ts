import {
	DocCollection,
	Processor,
} from "dgeni";
import { MemberDoc } from "dgeni-packages/typescript/api-doc-types/MemberDoc";

function hasDocsPrivateTag( element ) {
	let tags = element.tags && element.tags.tags;
	return tags ? tags.find( tag => tag.tagName == "docs-private" ) : false;
}

function hasPublicAccessibility( element:MemberDoc ) {
	return element.accessibility === "public";
}

export function privateFilterProcessor():PrivateFilter {
	return new PrivateFilter();
}

export class PrivateFilter implements Processor {

	$runAfter = [ "tags-extracted" ];
	$runBefore = [ "processing-docs" ];

	$process( docs:DocCollection ) {
		return docs.filter( doc => {
			if( doc.members ) doc.members = doc.members
				.filter( member => ! hasDocsPrivateTag( member ) )
				.filter( hasPublicAccessibility );

			if( doc.exports ) doc.exports = doc.exports
				.filter( exported => ! hasDocsPrivateTag( exported ) );
			return ! hasDocsPrivateTag( doc );
		} );
	}

}
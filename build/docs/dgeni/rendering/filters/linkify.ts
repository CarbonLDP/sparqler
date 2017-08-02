import { Document } from "dgeni";
import { Filter } from "./Filter";

const IDENTIFIERS_REGEX:RegExp = /((?::|=>?|&lt;|&amp;|\||extends|,|^) ?)([_$a-zA-Z][_$a-zA-Z0-9]*)/g;

export function linkify( getLinkInfo ):Filter {
	return {
		name: "linkify",
		process( str:string, doc:Document = this.ctx.doc ):string {
			if( ! str ) return;

			if( ! IDENTIFIERS_REGEX.test( str ) ) return str;
			return str
				.replace( /&/g, "&amp;" )
				.replace( /</g, "&lt;" )
				.replace( />/g, "&gt;" )
				.replace( /"/g, "&quot;" )
				.replace( /'/g, "&#039;" )
				.replace( IDENTIFIERS_REGEX, ( match:string, before:string, identifier:string ) => {
					const linkInfo = getLinkInfo( identifier, identifier, doc );

					if( ! linkInfo.valid ) return match;

					return `${ before }<a href="${ linkInfo.url }">${ identifier }</a>`;
				} )
				;
		},
	};
}

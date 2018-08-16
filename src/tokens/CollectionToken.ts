import { ObjectToken } from "./ObjectToken";
import { getTokenContainerString } from "./printing";
import { TokenNode } from "./TokenNode";


/**
 * The token of a collection triples node.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rCollection}
 * @see {@link https://www.w3.org/TR/sparql11-query/#rCollectionPath}
 */
export class CollectionToken implements TokenNode {
	readonly token:"collection" = "collection";

	readonly objects:ObjectToken[];

	constructor() {
		this.objects = [];
	}


	addObject( ...object:ObjectToken[] ):this {
		this.objects.push( ...object );
		return this;
	}


	toString( spaces?:number ):string {
		return getTokenContainerString( {
			spaces,
			tags: { open: "(", close: ")" },
			tokens: this.objects,
		} );
	}
}

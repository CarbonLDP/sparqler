import { ObjectToken } from "./ObjectToken";
import { getTokenContainerString } from "./printing";
import { TokenNode } from "./TokenNode";


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
			tags: { open:"(", close: ")" },
			tokens: this.objects,
		} );
	}
}

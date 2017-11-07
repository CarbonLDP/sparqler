import { ObjectToken } from "sparqler/tokens";
import { TokenNode } from "sparqler/tokens/TokenNode";

export class CollectionToken implements TokenNode {
	readonly token:"collection" = "collection";
	readonly objects:ObjectToken[];

	constructor() {
		this.objects = [];
	}

	toString():string {
		if ( ! this.objects.length ) return "()";
		return `( ${ this.objects.join( " " ) } )`;
	}
}

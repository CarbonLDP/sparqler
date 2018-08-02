import { ObjectToken } from "./ObjectToken";
import { TokenNode } from "./TokenNode";


export class CollectionToken implements TokenNode {
	readonly token:"collection" = "collection";
	readonly objects:ObjectToken[];

	constructor() {
		this.objects = [];
	}

	addObject( object:ObjectToken ):this {
		this.objects.push( object );
		return this;
	}

	toString():string {
		if( ! this.objects.length ) return "()";
		return `( ${ this.objects.join( " " ) } )`;
	}
}

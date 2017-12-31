import {
	ObjectToken,
	VariableOrIRI,
} from "./";
import { TokenNode } from "./TokenNode";

export class PredicateToken implements TokenNode {
	readonly token:"predicate" = "predicate";
	readonly predicate:VariableOrIRI | "a";
	readonly objects:ObjectToken[];

	constructor( predicate:VariableOrIRI | "a" ) {
		this.predicate = predicate;
		this.objects = [];
	}

	addObject( object:ObjectToken ):this {
		this.objects.push( object );
		return this;
	}

	toString():string {
		return `${ this.predicate } ${ this.objects.join( ", " ) }`;
	}
}

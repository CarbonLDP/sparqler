import { TermToken } from "sparqler/tokens";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { VariableToken } from "sparqler/tokens/VariableToken";

export class PredicateToken implements TokenNode {
	readonly token:"predicate" = "predicate";
	readonly predicate:VariableToken | IRIToken | PrefixedNameToken | "a";
	readonly objects:( VariableToken | TermToken )[];

	constructor( predicate:VariableToken | IRIToken | PrefixedNameToken | "a" ) {
		this.predicate = predicate;
		this.objects = [];
	}

	addObject( object:VariableToken | TermToken ):this {
		this.objects.push( object );
		return this;
	}

	toString():string {
		return `${ this.predicate } ${ this.objects.join( ", " ) }`;
	}
}

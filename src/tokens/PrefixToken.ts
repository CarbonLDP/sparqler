import { IRIRefToken } from "./IRIRefToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `PREFIX` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPrefixDecl
 */
export class PrefixToken implements TokenNode {
	readonly token:"prefix" = "prefix";
	readonly namespace:string;
	readonly iri:IRIRefToken;

	constructor( namespace:string, iri:IRIRefToken ) {
		this.namespace = namespace;
		this.iri = iri;
	}

	toString( spaces?:number ):string {
		return `PREFIX ${ this.namespace }:${ this.iri }`;
	}
}

import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `PREFIX` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPrefixDecl}
 */
export class PrefixToken implements TokenNode {
	readonly token:"prefix" = "prefix";
	readonly namespace:string;
	readonly iri:IRIToken;

	constructor( namespace:string, iri:IRIToken ) {
		this.namespace = namespace;
		this.iri = iri;
	}

	toString( spaces?:number ):string {
		return `PREFIX ${ this.namespace }: ${ this.iri }`;
	}
}

import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `BASE` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rBaseDecl}
 */
export class BaseToken implements TokenNode {
	readonly token:"base" = "base";
	readonly iri:IRIToken;

	constructor( iri:IRIToken ) {
		this.iri = iri;
	}

	toString():string {
		return `BASE ${ this.iri }`;
	}
}

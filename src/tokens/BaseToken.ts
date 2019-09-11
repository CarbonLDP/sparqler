import { IRIRefToken } from "./IRIRefToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `BASE` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rBaseDecl
 */
export class BaseToken implements TokenNode {
	readonly token:"base" = "base";
	readonly iri:IRIRefToken;

	constructor( iri:IRIRefToken ) {
		this.iri = iri;
	}

	toString():string {
		return `BASE ${ this.iri }`;
	}
}

import { IRIToken } from "sparqler/tokens/IRIToken";
import { TokenNode } from "sparqler/tokens/TokenNode";

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

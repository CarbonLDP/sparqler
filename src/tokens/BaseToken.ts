import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";

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

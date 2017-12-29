import { IRIToken } from "sparqler/tokens/IRIToken";
import { TokenNode } from "sparqler/tokens/TokenNode";

export class PrefixToken implements TokenNode {
	readonly token:"prefix" = "prefix";
	readonly namespace:string;
	readonly iri:IRIToken;

	constructor( namespace:string, iri:IRIToken ) {
		this.namespace = namespace;
		this.iri = iri;
	}

	toString():string {
		return `PREFIX ${ this.namespace }: ${ this.iri }`;
	}
}

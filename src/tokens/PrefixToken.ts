import { TermToken } from "sparqler/tokens";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { TokenNode } from "sparqler/tokens/TokenNode";
import { VariableToken } from "sparqler/tokens/VariableToken";

export class PrefixToken implements TokenNode {
	readonly token:"prefix" = "prefix";
	readonly name:string;
	readonly iri:IRIToken;

	constructor( name:string, iri:IRIToken ) {
		this.name = name;
		this.iri = iri;
	}`

	toString():string {
		return `PREFIX ${ this.name }: ${ this.iri }`;
	}
}

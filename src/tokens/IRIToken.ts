import { TokenNode } from "./TokenNode";

export class IRIToken implements TokenNode {
	readonly token:"iri" = "iri";
	readonly value:string;

	constructor( value:string ) {
		this.value = value;
	}

	toString():string {
		return `<${ this.value }>`;
	}
}

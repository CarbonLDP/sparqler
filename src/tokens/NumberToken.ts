import { TokenNode } from "./TokenNode";

export class NumberToken implements TokenNode {
	readonly token:"number" = "number";
	readonly value:number;

	constructor( value:number ) {
		this.value = value;
	}

	toString( spaces?:number ):string {
		return `${ this.value }`;
	}
}

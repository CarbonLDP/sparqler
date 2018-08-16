import { TokenNode } from "./TokenNode";


// TODO: Remove. Its unnecessary
export class BooleanToken implements TokenNode {
	readonly token:"boolean" = "boolean";
	readonly value:boolean;

	constructor( value:boolean ) {
		this.value = value;
	}

	toString( spaces?:number ):string {
		return `${ this.value }`;
	}
}

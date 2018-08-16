import { TokenNode } from "./TokenNode";

// TODO: Remove. Its unnecessary
export class StringToken implements TokenNode {
	readonly token:"string" = "string";
	readonly value:string;

	constructor( value:string ) {
		this.value = value;
	}

	toString( spaces?:number ):string {
		return `"${ this.value }"`;
	}
}

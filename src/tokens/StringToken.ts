import { TokenNode } from "./TokenNode";

export class StringToken implements TokenNode {
	readonly token:"string" = "string";
	readonly value:string;

	constructor( value:string ) {
		this.value = value;
	}

	toString():string {
		return `"${ this.value }"`;
	}
}

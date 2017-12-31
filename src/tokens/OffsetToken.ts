import { TokenNode } from "./TokenNode";

export class OffsetToken implements TokenNode {
	readonly token:"offset" = "offset";
	readonly value:number;

	constructor( value:number ) {
		this.value = value;
	}


	toString():string {
		return `OFFSET ${ this.value }`;
	}
}

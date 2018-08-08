import { TokenNode } from "sparqler/tokens/TokenNode";

export class OffsetToken implements TokenNode {
	readonly token:"offset" = "offset";
	readonly value:number;

	constructor( value:number ) {
		this.value = value;
	}


	toString( spaces?:number ):string {
		return `OFFSET ${ this.value }`;
	}
}

import { TokenNode } from "./TokenNode";


/**
 * The token of the `OFFSET` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rOffsetClause
 */
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

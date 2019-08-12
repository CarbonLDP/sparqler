import { TokenNode } from "./TokenNode";


/**
 * The token of the any literal term.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rRDFLiteral
 * @see https://www.w3.org/TR/sparql11-query/#rNumericLiteral
 * @see https://www.w3.org/TR/sparql11-query/#rBooleanLiteral
 */
export class LiteralToken implements TokenNode {
	readonly token:"literal" = "literal";

	readonly value:boolean | number | string;

	constructor( value:boolean | number | string ) {
		this.value = value;
	}

	toString( spaces?:number ):string {
		return JSON.stringify( this.value );
	}
}

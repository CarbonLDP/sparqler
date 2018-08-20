import { TokenNode } from "./TokenNode";


/**
 * The token of the `LIMIT` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rLimitClause}
 */
export class LimitToken implements TokenNode {
	readonly token:"limit" = "limit";
	readonly value:number;

	constructor( value:number ) {
		this.value = value;
	}

	toString():string {
		return `LIMIT ${ this.value }`;
	}
}

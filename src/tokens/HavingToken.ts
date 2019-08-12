import { TokenNode } from "./TokenNode";


/**
 * The token of the `HAVING` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rHavingClause
 */
export class HavingToken implements TokenNode {
	readonly token:"having" = "having";

	readonly rawCondition:string;

	constructor( rawCondition:string ) {
		this.rawCondition = rawCondition;
	}


	toString( spaces?:number ):string {
		return `HAVING ${ this.rawCondition }`;
	}
}

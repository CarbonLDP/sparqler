import { TokenNode } from "./TokenNode";


/**
 * The token of the `GROUP BY` statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGroupClause}
 */
export class GroupToken implements TokenNode {
	readonly token:"group" = "group";

	readonly rawCondition:string;

	constructor( rawCondition:string ) {
		this.rawCondition = rawCondition;
	}


	toString( spaces?:number ):string {
		return `GROUP BY ${ this.rawCondition }`;
	}
}

import { ConstraintToken } from "./ConstraintToken";
import { TokenNode } from "./TokenNode";


/**
 * The token of the `FILTER` statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rFilter
 */
export class FilterToken implements TokenNode {
	readonly token:"filter" = "filter";

	readonly constraint:ConstraintToken;

	constructor( constraint:ConstraintToken ) {
		this.constraint = constraint;
	}

	toString( spaces?:number ):string {
		let tokenStr:string = "FILTER";

		if( this.constraint.token === "function" )
			tokenStr += " ";

		return tokenStr + this.constraint.toString( spaces );
	}
}

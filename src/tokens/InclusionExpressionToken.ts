import { ExpressionListToken } from "./ExpressionListToken";
import { NumericExpressionToken } from "./NumericExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the relational inclusion expression.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rRelationalExpression}
 */
export class InclusionExpressionToken implements TokenNode {
	readonly token:"inclusionExpression" = "inclusionExpression";

	readonly expression:NumericExpressionToken;
	readonly operation:"IN" | "NOT IN";
	readonly list:ExpressionListToken;

	constructor( expression:NumericExpressionToken, operation:"IN" | "NOT IN", list:ExpressionListToken ) {
		this.expression = expression;
		this.operation = operation;
		this.list = list;
	}


	toString( spaces?:number ):string {
		return this.expression.toString( 0 ) + " " +
			this.operation + " " +
			this.list.toString( spaces );
	}

}

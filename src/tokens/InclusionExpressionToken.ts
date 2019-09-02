import { ExpressionListToken } from "./ExpressionListToken";
import { ExpressionToken } from "./ExpressionToken";
import { NumericExpressionToken } from "./NumericExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the relational inclusion expression.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rRelationalExpression
 */
export class InclusionExpressionToken implements TokenNode {
	readonly token:"inclusionExpression" = "inclusionExpression";

	readonly operator:"IN" | "NOT IN";
	readonly operand:NumericExpressionToken;
	readonly expressionList:ExpressionListToken;

	constructor( operator:"IN" | "NOT IN", operand:NumericExpressionToken, expressions:ExpressionToken[] ) {
		this.operand = operand;
		this.operator = operator;
		this.expressionList = new ExpressionListToken( expressions );
	}


	toString( spaces?:number ):string {
		return this.operand.toString( 0 ) + " " +
			this.operator +
			this.expressionList.toString( spaces );
	}

}

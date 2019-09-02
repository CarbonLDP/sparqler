import { ExpressionToken } from "./ExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the a bracketed expression.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rBrackettedExpression
 */
export class BracketedExpressionToken implements TokenNode {
	readonly token:"bracketedExpression" = "bracketedExpression";

	readonly expression:ExpressionToken;

	constructor( expression:ExpressionToken ) {
		this.expression = expression;
	}

	toString( spaces?:number ):string {
		const separator = spaces !== undefined
			? " " : "";

		return "(" + separator +
			this.expression.toString( spaces ) +
			separator + ")";
	}
}

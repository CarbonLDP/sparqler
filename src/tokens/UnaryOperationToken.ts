import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the unary operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rUnaryExpression}
 */
export class UnaryOperationToken implements TokenNode {
	readonly token:"unaryOperation" = "unaryOperation";

	readonly expression:PrimaryExpressionToken;
	readonly operation:"!" | "+" | "-";

	constructor( expression:PrimaryExpressionToken, operation:"!" | "+" | "-" ) {
		this.expression = expression;
		this.operation = operation;
	}


	toString( spaces?:number ):string {
		const separator = spaces !== undefined
			? " " : "";

		return this.operation + separator +
			this.expression.toString( spaces )
			;
	}
}

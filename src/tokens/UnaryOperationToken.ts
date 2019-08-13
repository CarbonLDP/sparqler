import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Token that represents the unary operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rUnaryExpression}
 */
export class UnaryOperationToken implements TokenNode {
	readonly token:"unaryOperation" = "unaryOperation";

	readonly operator:"!" | "+" | "-";
	readonly operand:PrimaryExpressionToken;

	constructor( operator:"!" | "+" | "-", operand:PrimaryExpressionToken ) {
		this.operator = operator;
		this.operand = operand;
	}


	toString( spaces?:number ):string {
		const separator = spaces !== undefined
			? " " : "";

		return this.operator + separator +
			this.operand.toString( spaces )
			;
	}
}

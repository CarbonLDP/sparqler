import { BinaryOperationToken } from "./BinaryOperationToken";
import { NumericExpressionToken } from "./NumericExpressionToken";


/**
 * Token that represents the relational operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rRelationalExpression}
 */
export class RelationalOperationToken extends BinaryOperationToken<NumericExpressionToken, "=" | "!=" | "<" | ">" | "<=" | ">="> {
	readonly token:"relationalOperation" = "relationalOperation";

	readonly operations!:[ "=" | "!=" | "<" | ">" | "<=" | ">=" ];
	readonly expressions!:[ NumericExpressionToken ];


	addOperation( expression:NumericExpressionToken, operation:"=" | "!=" | "<" | ">" | "<=" | ">=" ):this {
		this.expressions[ 0 ] = expression;
		this.operations[ 0 ] = operation;

		return this;
	}
}

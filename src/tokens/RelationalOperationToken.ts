import { BinaryOperationToken } from "./BinaryOperationToken";
import { NumericExpressionToken } from "./NumericExpressionToken";


/**
 * Token that represents the relational operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rRelationalExpression}
 */
export class RelationalOperationToken extends BinaryOperationToken<"=" | "!=" | "<" | ">" | "<=" | ">=", NumericExpressionToken> {
	readonly token:"relationalOperation" = "relationalOperation";

	readonly operands!:[ NumericExpressionToken ] | [ NumericExpressionToken, NumericExpressionToken ];


	addOperand( operand:NumericExpressionToken ):this {
		this.operands.length = 1;
		return super.addOperand( operand );
	}
}

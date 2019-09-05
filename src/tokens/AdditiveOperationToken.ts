import { BinaryOperationToken } from "./BinaryOperationToken";
import { MultiplicativeExpressionToken } from "./MultiplicativeExpressionToken";


/**
 * Token that represents the additive operations for expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rAdditiveExpression
 */
export class AdditiveOperationToken extends BinaryOperationToken<"+" | "-", MultiplicativeExpressionToken> {
	readonly token:"additiveOperation" = "additiveOperation";
}

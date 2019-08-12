import { BinaryOperationToken } from "./BinaryOperationToken";
import { UnaryExpressionToken } from "./UnaryExpressionToken";


/**
 * Token that represents the multiplicative operations for expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rMultiplicativeExpression}
 */
export class MultiplicativeOperationToken extends BinaryOperationToken<UnaryExpressionToken, "*" | "/"> {
	readonly token:"multiplicativeOperation" = "multiplicativeOperation";
}

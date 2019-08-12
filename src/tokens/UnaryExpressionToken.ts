import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { UnaryOperationToken } from "./UnaryOperationToken";


/**
 * Alias with the tokens that comprehends all the kinds of unary expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rUnaryExpression}
 */
export type UnaryExpressionToken =
	| UnaryOperationToken
	| PrimaryExpressionToken;

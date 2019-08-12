import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { UnaryExpressionToken } from "./UnaryExpressionToken";


/**
 * Alias with the tokens that comprehends all the kinds of multiplicative expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rMultiplicativeExpression}
 */
export type MultiplicativeExpressionToken =
	| MultiplicativeOperationToken
	| UnaryExpressionToken;

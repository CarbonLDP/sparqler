import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { MultiplicativeExpressionToken } from "./MultiplicativeExpressionToken";


/**
 * Alias with the tokens that comprehends all the kinds of additive expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rAdditiveExpression}
 */
export type AdditiveExpressionToken =
	| AdditiveOperationToken
	| MultiplicativeExpressionToken;
import { AdditiveExpressionToken } from "./AdditiveExpressionToken";
import { RelationalOperationToken } from "./RelationalOperationToken";


/**
 * Alias with the tokens that comprehends all the kinds of relational expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rRelationalExpression}
 */
export type RelationalExpressionToken =
	| RelationalOperationToken
	| AdditiveExpressionToken;

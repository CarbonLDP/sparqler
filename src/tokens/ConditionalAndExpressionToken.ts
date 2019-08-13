import { ConditionalAndOperationToken } from "./ConditionalAndOperationToken";
import { ValueLogicalToken } from "./ValueLogicalToken";


/**
 * Alias with the tokens that comprehends all the kinds of conditional AND expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rConditionalAndExpression}
 */
export type ConditionalAndExpressionToken =
	| ConditionalAndOperationToken
	| ValueLogicalToken;

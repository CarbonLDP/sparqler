import { ConditionalAndExpressionToken } from "./ConditionalAndExpressionToken";
import { ConditionalOrOperationToken } from "./ConditionalOrOperationToken";


/**
 * Alias with the tokens that comprehends all the kinds of conditional OR expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rConditionalOrExpression}
 */
export type ConditionalOrExpressionToken =
	| ConditionalOrOperationToken
	| ConditionalAndExpressionToken;

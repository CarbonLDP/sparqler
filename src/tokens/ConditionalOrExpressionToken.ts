import { ConditionalAndExpressionToken } from "./ConditionalAndExpressionToken";
import { ConditionalOrOperationToken } from "./ConditionalOrOperationToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of conditional OR expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rConditionalOrExpression}
 */
export type ConditionalOrExpressionToken =
	| ConditionalOrOperationToken
	| ConditionalAndExpressionToken;


// TODO: Document
export const ConditionalOrExpressionToken:{
	is( token:TokenNode ):token is ConditionalOrExpressionToken;
} = {
	is: ( token ):token is ConditionalOrExpressionToken =>
		token.token === "conditionalOrOperation" ||
		ConditionalAndExpressionToken.is( token )
	,
};
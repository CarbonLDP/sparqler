import { ConditionalAndExpressionToken } from "./ConditionalAndExpressionToken";
import { ConditionalOrOperationToken } from "./ConditionalOrOperationToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of conditional OR expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rConditionalOrExpression
 */
export type ConditionalOrExpressionToken =
	| ConditionalOrOperationToken
	| ConditionalAndExpressionToken;


/**
 * Constant with the utils for {@link ConditionalOrExpressionToken} objects.
 */
export const ConditionalOrExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link ConditionalOrExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is ConditionalOrExpressionToken;
} = {
	is: ( token ):token is ConditionalOrExpressionToken =>
		token.token === "conditionalOrOperation" ||
		ConditionalAndExpressionToken.is( token )
	,
};
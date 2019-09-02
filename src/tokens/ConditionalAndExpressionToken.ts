import { ConditionalAndOperationToken } from "./ConditionalAndOperationToken";
import { TokenNode } from "./TokenNode";
import { ValueLogicalToken } from "./ValueLogicalToken";


/**
 * Alias with the tokens that comprehends all the kinds of conditional AND expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rConditionalAndExpression
 */
export type ConditionalAndExpressionToken =
	| ConditionalAndOperationToken
	| ValueLogicalToken;


/**
 * Constant with the utils for {@link ConditionalAndExpressionToken} objects.
 */
export const ConditionalAndExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link ConditionalAndExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is ConditionalAndExpressionToken;
} = {
	is: ( token ):token is ConditionalAndExpressionToken =>
		token.token === "conditionalAndOperation" ||
		ValueLogicalToken.is( token )
	,
};
import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { MultiplicativeExpressionToken } from "./MultiplicativeExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of additive expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rAdditiveExpression
 */
export type AdditiveExpressionToken =
	| AdditiveOperationToken
	| MultiplicativeExpressionToken;


/**
 * Constant with the utils for {@link AdditiveExpressionToken} objects.
 */
export const AdditiveExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link AdditiveExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is AdditiveExpressionToken;
} = {
	is: ( token ):token is AdditiveExpressionToken =>
		token.token === "additiveOperation" ||
		MultiplicativeExpressionToken.is( token )
	,
};
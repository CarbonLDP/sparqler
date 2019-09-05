import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { TokenNode } from "./TokenNode";
import { UnaryExpressionToken } from "./UnaryExpressionToken";


/**
 * Alias with the tokens that comprehends all the kinds of multiplicative expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rMultiplicativeExpression
 */
export type MultiplicativeExpressionToken =
	| MultiplicativeOperationToken
	| UnaryExpressionToken;


/**
 * Constant with the utils for {@link MultiplicativeExpressionToken} objects.
 */
export const MultiplicativeExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link MultiplicativeExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is MultiplicativeExpressionToken;
} = {
	is: ( token ):token is MultiplicativeExpressionToken =>
		token.token === "multiplicativeOperation" ||
		UnaryExpressionToken.is( token )
	,
};

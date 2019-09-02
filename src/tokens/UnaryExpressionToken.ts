import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { TokenNode } from "./TokenNode";
import { UnaryOperationToken } from "./UnaryOperationToken";


/**
 * Alias with the tokens that comprehends all the kinds of unary expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rUnaryExpression
 */
export type UnaryExpressionToken =
	| UnaryOperationToken
	| PrimaryExpressionToken;


/**
 * Constant with the utils for {@link UnaryExpressionToken} objects.
 */
export const UnaryExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link UnaryExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is UnaryExpressionToken;
} = {
	is: ( token ):token is UnaryExpressionToken =>
		token.token === "unaryOperation" ||
		PrimaryExpressionToken.is( token )
	,
};
import { PrimaryExpressionToken } from "./PrimaryExpressionToken";
import { TokenNode } from "./TokenNode";
import { UnaryOperationToken } from "./UnaryOperationToken";


/**
 * Alias with the tokens that comprehends all the kinds of unary expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rUnaryExpression}
 */
export type UnaryExpressionToken =
	| UnaryOperationToken
	| PrimaryExpressionToken;


// TODO: Document
export const UnaryExpressionToken:{
	is( token:TokenNode ):token is UnaryExpressionToken;
} = {
	is: ( token ):token is UnaryExpressionToken =>
		token.token === "conditionalAndOperation" ||
		PrimaryExpressionToken.is( token )
	,
};
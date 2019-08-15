import { MultiplicativeOperationToken } from "./MultiplicativeOperationToken";
import { TokenNode } from "./TokenNode";
import { UnaryExpressionToken } from "./UnaryExpressionToken";


/**
 * Alias with the tokens that comprehends all the kinds of multiplicative expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rMultiplicativeExpression}
 */
export type MultiplicativeExpressionToken =
	| MultiplicativeOperationToken
	| UnaryExpressionToken;


// TODO: Document
export const MultiplicativeExpressionToken:{
	is( token:TokenNode ):token is MultiplicativeExpressionToken;
} = {
	is: ( token ):token is MultiplicativeExpressionToken =>
		token.token === "multiplicativeOperation" ||
		UnaryExpressionToken.is( token )
	,
};

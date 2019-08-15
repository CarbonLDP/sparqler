import { AdditiveOperationToken } from "./AdditiveOperationToken";
import { MultiplicativeExpressionToken } from "./MultiplicativeExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of additive expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rAdditiveExpression}
 */
export type AdditiveExpressionToken =
	| AdditiveOperationToken
	| MultiplicativeExpressionToken;


// TODO: Document
export const AdditiveExpressionToken:{
	is( token:TokenNode ):token is AdditiveExpressionToken;
} = {
	is: ( token ):token is AdditiveExpressionToken =>
		token.token === "additiveOperation" ||
		MultiplicativeExpressionToken.is( token )
	,
};
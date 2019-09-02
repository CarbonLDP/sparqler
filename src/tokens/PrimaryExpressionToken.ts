import { BracketedExpressionToken } from "./BracketedExpressionToken";
import { FunctionToken } from "./FunctionToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { RDFLiteralToken } from "./RDFLiteralToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";


/**
 * Alias with the tokens that comprehends all the kinds of primary expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPrimaryExpression
 */
export type PrimaryExpressionToken =
	| BracketedExpressionToken
	| FunctionToken
	| VariableToken
	| IRIToken
	| RDFLiteralToken
	| LiteralToken;


/**
 * Constant with the utils for {@link PrimaryExpressionToken} objects.
 */
export const PrimaryExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link PrimaryExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is PrimaryExpressionToken;
} = {
	is: ( token ):token is PrimaryExpressionToken =>
		token.token === "bracketedExpression" ||
		token.token === "function" ||
		token.token === "variable" ||
		IRIToken.is( token ) ||
		token.token === "literal"
	,
};
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
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPrimaryExpression}
 */
export type PrimaryExpressionToken =
	| BracketedExpressionToken
	| FunctionToken
	| VariableToken
	| IRIToken
	| RDFLiteralToken
	| LiteralToken;


export const PrimaryExpressionToken:{
	is( token:TokenNode ):token is PrimaryExpressionToken;
} = {
	is: ( token ):token is PrimaryExpressionToken =>
		token.token === "bracketedExpression" ||
		token.token === "function" ||
		token.token === "variable" ||
		// TODO: Create to IRIToken.is
		token.token === "iri" || token.token === "prefixedName" ||
		token.token === "literal"
	,
};
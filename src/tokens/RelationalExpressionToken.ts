import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { NumericExpressionToken } from "./NumericExpressionToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of relational expressions.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rRelationalExpression}
 */
export type RelationalExpressionToken =
	| RelationalOperationToken
	| InclusionExpressionToken
	| NumericExpressionToken;


// TODO: Document
export const RelationalExpressionToken:{
	is( token:TokenNode ):token is RelationalExpressionToken;
} = {
	is: ( token ):token is RelationalExpressionToken =>
		token.token === "relationalOperation" ||
		token.token === "inclusionExpression" ||
		NumericExpressionToken.is( token )
	,
};
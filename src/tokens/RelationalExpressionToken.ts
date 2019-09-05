import { InclusionExpressionToken } from "./InclusionExpressionToken";
import { NumericExpressionToken } from "./NumericExpressionToken";
import { RelationalOperationToken } from "./RelationalOperationToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of relational expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rRelationalExpression
 */
export type RelationalExpressionToken =
	| RelationalOperationToken
	| InclusionExpressionToken
	| NumericExpressionToken;


/**
 * Constant with the utils for {@link RelationalExpressionToken} objects.
 */
export const RelationalExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link RelationalExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is RelationalExpressionToken;
} = {
	is: ( token ):token is RelationalExpressionToken =>
		token.token === "relationalOperation" ||
		token.token === "inclusionExpression" ||
		NumericExpressionToken.is( token )
	,
};
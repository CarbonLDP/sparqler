import { ConditionalOrExpressionToken } from "./ConditionalOrExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with the tokens that comprehends all the kinds of expressions.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rExpression
 */
export type ExpressionToken = ConditionalOrExpressionToken;


/**
 * Constant with the utils for {@link ExpressionToken} objects.
 */
export const ExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link ExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is ExpressionToken;
} = {
	is: ConditionalOrExpressionToken.is,
};
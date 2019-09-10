import { AdditiveExpressionToken } from "./AdditiveExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with for the additive expression tokens.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rNumericExpression
 */
export type NumericExpressionToken = AdditiveExpressionToken;


/**
 * Constant with the utils for {@link NumericExpressionToken} objects.
 */
export const NumericExpressionToken:{
	/**
	 * Return true if the {@param token} is a valid {@link NumericExpressionToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is NumericExpressionToken;
} = {
	is: AdditiveExpressionToken.is,
};
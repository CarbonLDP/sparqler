import { AdditiveExpressionToken } from "./AdditiveExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with for the additive expression tokens.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rNumericExpression}
 */
export type NumericExpressionToken = AdditiveExpressionToken;


// TODO: Document
export const NumericExpressionToken:{
	is( token:TokenNode ):token is NumericExpressionToken;
} = {
	is: AdditiveExpressionToken.is,
};
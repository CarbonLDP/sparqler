import { RelationalExpressionToken } from "./RelationalExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with for the relational expression tokens.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rValueLogical
 */
export type ValueLogicalToken = RelationalExpressionToken;


/**
 * Constant with the utils for {@link ValueLogicalToken} objects.
 */
export const ValueLogicalToken:{
	/**
	 * Return true if the {@param token} is a valid {@link ValueLogicalToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is ValueLogicalToken;
} = {
	is: RelationalExpressionToken.is,
};
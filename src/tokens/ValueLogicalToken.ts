import { RelationalExpressionToken } from "./RelationalExpressionToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias with for the relational expression tokens.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rValueLogical}
 */
export type ValueLogicalToken = RelationalExpressionToken;


// TODO: Document
export const ValueLogicalToken:{
	is( token:TokenNode ):token is ValueLogicalToken;
} = {
	is: RelationalExpressionToken.is,
};
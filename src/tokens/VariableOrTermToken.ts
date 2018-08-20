import { TermToken } from "./TermToken";
import { VariableToken } from "./VariableToken";


/**
 * @see https://www.w3.org/TR/sparql11-query/#rVarOrTerm
 */
export type VariableOrTermToken = VariableToken | TermToken;

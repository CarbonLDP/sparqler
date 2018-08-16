import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { VariableToken } from "./VariableToken";

/**
 * @see {@link https://www.w3.org/TR/sparql11-query/#rVarOrIri}
 */
export type VariableOrIRIToken = VariableToken | IRIToken | PrefixedNameToken;

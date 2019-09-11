import { IRIToken } from "./IRIToken";
import { VariableToken } from "./VariableToken";

/**
 * @see https://www.w3.org/TR/sparql11-query/#rVarOrIri
 */
export type VariableOrIRIToken = VariableToken | IRIToken;

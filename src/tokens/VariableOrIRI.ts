import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { VariableToken } from "./VariableToken";


export type VariableOrIRI = VariableToken | IRIToken | PrefixedNameToken;

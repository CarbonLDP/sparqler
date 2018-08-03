import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { VariableToken } from "./VariableToken";


export type VariableOrIRIToken = VariableToken | IRIToken | PrefixedNameToken;

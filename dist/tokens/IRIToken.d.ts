import { IRIRefToken } from "./IRIRefToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
export declare type IRIToken = IRIRefToken | PrefixedNameToken;
export declare function getIRIToken(iri: string): IRIToken;

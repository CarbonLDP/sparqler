import { IRIToken } from "../../tokens/IRIToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";
import { TripleSubject } from "./TripleSubject";
export interface Resource extends TripleSubject<IRIToken | PrefixedNameToken> {
}

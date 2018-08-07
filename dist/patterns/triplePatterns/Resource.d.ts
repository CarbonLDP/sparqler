import { IRIToken } from "../../tokens/IRIToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";
import { TriplePatternHas } from "./TriplePatternHas";
export interface Resource extends TriplePatternHas<IRIToken | PrefixedNameToken> {
}

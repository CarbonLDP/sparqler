import { IRIToken } from "../../tokens/IRIToken";
import { PrefixedNameToken } from "../../tokens/PrefixedNameToken";

import { TriplePatternHas } from "./TriplePatternHas";


/**
 * Wrapper for easier usage of IRIs and prefixed names as objects
 * and for declaring triple patterns as its subject.
 */
export interface Resource extends TriplePatternHas<IRIToken | PrefixedNameToken> {}

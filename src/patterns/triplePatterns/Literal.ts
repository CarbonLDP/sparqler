import { LiteralToken } from "../../tokens/LiteralToken";

import { TriplePatternHas } from "./TriplePatternHas";


/**
 * Wrapper for easier usage of SPARQL Literals as objects and for
 * declaring triple patterns as its subject.
 */
export interface Literal extends TriplePatternHas<LiteralToken> {}

import { BlankNodeToken } from "../../tokens/BlankNodeToken";

import { TriplePatternHas } from "./TriplePatternHas";


/**
 * Wrapper for easier usage of SPARQL BlankNode resources as objects
 * and for declaring triple patterns as its subject.
 */
export interface BlankNode extends TriplePatternHas<BlankNodeToken> {}

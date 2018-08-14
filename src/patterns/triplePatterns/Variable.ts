import { VariableToken } from "../../tokens/VariableToken";

import { TriplePatternHas } from "./TriplePatternHas";


/**
 * Wrapper for easier usage of SPARQL variables as objects and for
 * declaring triple pattern as its subject.
 */
export interface Variable extends TriplePatternHas<VariableToken> {}

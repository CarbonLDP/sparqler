import { NotTripleToken } from "./NotTripleToken";
import { SubSelectToken } from "./SubSelectToken";
import { TripleNodeToken } from "./TripleNodeToken";
import { TripleToken } from "./TripleToken";


/**
 * Alias for the tokens that can be used as patterns.
 *
 * This alias doesn't have direct grammar, but it represents the
 * content described by the https://www.w3.org/TR/sparql11-query/#rGroupGraphPattern.
 */
export type PatternToken = SubSelectToken | TripleToken | TripleNodeToken | NotTripleToken;
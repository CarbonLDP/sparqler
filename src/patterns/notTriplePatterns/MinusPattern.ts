import { MinusPatternToken } from "../../tokens/MinusPatternToken";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL MINUS patterns.
 */
export interface MinusPattern extends NotTriplePattern<MinusPatternToken> {
}

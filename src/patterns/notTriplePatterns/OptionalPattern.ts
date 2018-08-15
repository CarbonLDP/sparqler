import { OptionalToken } from "../../tokens/OptionalToken";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL OPTIONAL patterns.
 */
export interface OptionalPattern extends NotTriplePattern<OptionalToken> {
}

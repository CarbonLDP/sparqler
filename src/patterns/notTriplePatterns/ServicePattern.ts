import { ServicePatternToken } from "../../tokens/ServicePatternToken";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL SERVICE patterns.
 */
export interface ServicePattern extends NotTriplePattern<ServicePatternToken> {
}

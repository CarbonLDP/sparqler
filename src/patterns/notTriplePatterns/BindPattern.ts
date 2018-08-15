import { BindToken } from "../../tokens/BindToken";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL BIND patterns.
 */
export interface BindPattern extends NotTriplePattern<BindToken> {
}

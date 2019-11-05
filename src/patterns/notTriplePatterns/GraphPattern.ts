import { GraphToken } from "../../tokens/GraphToken";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * Wrapper for easier usage of SPARQL GRAPH patterns.
 */
export interface GraphPattern extends NotTriplePattern<GraphToken> {
}

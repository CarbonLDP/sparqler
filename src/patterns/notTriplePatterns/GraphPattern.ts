import { NotTriplePattern } from "./NotTriplePattern";
import { GraphToken } from "../../tokens/GraphToken";


/**
 * Wrapper for easier usage of SPARQL GRAPH patterns.
 */
export interface GraphPattern extends NotTriplePattern<GraphToken> {
}

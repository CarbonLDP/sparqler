import { BlankNodePropertyToken } from "./BlankNodePropertyToken";
import { CollectionToken } from "./CollectionToken";


/**
 * Alias for the tokens that are considered as triples node.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rTriplesNode}
 */
export type TripleNodeToken = CollectionToken | BlankNodePropertyToken;

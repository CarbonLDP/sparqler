import { CollectionToken } from "../../tokens/CollectionToken";
import { TripleToken } from "../../tokens/TripleToken";

import { Pattern } from "../Pattern";
import { TriplePatternHas } from "./TriplePatternHas";


/**
 * Wrapper for easier usage of SPARQL Collections as objects and for
 * declaring triple patterns as its subject.
 */
export interface Collection extends TriplePatternHas<CollectionToken>, Pattern<TripleToken<CollectionToken>> {}

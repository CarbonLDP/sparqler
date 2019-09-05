import { CollectionToken } from "../../tokens/CollectionToken";

import { Pattern } from "../Pattern";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of SPARQL Collections as objects and for
 * declaring triple patterns as its subject.
 */
export interface Collection extends TripleSubject<CollectionToken>, Pattern<CollectionToken> {}

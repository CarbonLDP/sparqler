import { IRIToken } from "../../tokens/IRIToken";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of IRIs and prefixed names as objects
 * and for declaring triple patterns as its subject.
 */
export interface Resource extends TripleSubject<IRIToken> {}

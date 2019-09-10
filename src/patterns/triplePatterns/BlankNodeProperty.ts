import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";

import { Pattern } from "../Pattern";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of SPARQL BlankNode Property List as
 * objects and for declaring triple patterns as its subject.
 */
export interface BlankNodeProperty extends TripleSubject<BlankNodePropertyToken>, Pattern<BlankNodePropertyToken> {}

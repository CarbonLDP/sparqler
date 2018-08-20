import { LiteralToken } from "../../tokens/LiteralToken";

import { TripleSubject } from "./TripleSubject";


/**
 * Wrapper for easier usage of SPARQL Literals as objects and for
 * declaring triple patterns as its subject.
 */
export interface Literal extends TripleSubject<LiteralToken> {}

import { BlankNodeToken } from "./BlankNodeToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { RDFLiteralToken } from "./RDFLiteralToken";


/**
 * Alias fot the tokens that are defined as a term.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rGraphTerm
 */
export type TermToken = IRIToken | RDFLiteralToken | LiteralToken | BlankNodeToken;

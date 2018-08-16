import { BlankNodeToken } from "./BlankNodeToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";


/**
 * Alias fot the tokens that are defined as a term.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rGraphTerm}
 */
export type TermToken = IRIToken | PrefixedNameToken | BlankNodeToken | LiteralToken;

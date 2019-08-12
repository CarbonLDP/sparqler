import { IRIToken } from "./IRIToken";
import { PathInverseToken } from "./PathInverseToken";


/**
 * Alias for the tokens used by {@link PathNegatedToken}.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathOneInPropertySet
 */
export type PathInNegatedToken = IRIToken | "a" | PathInverseToken<IRIToken | "a">

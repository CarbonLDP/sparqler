import { IRIToken } from "./IRIToken";
import { PathNegatedToken } from "./PathNegatedToken";
import { SubPathToken } from "./SubPathToken";


/**
 * Alias to the primary path of a path statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathPrimary
 */
export type PathPrimaryToken = IRIToken | "a" | PathNegatedToken | SubPathToken<any>;

import { IRIToken } from "./IRIToken";
import { SubPathToken } from "./SubPathToken";
import { PathNegatedToken } from "./PathNegatedToken";


/**
 * Alias to the primary path of a path statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathPrimary}
 */
export type PathPrimaryToken = IRIToken | "a" | PathNegatedToken | SubPathToken<any>;

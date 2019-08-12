import { PathModToken } from "./PathModToken";
import { PathPrimaryToken } from "./PathPrimaryToken";


/**
 * Alias for the elt path statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathElt
 */
export type PathEltToken = PathPrimaryToken | PathModToken;

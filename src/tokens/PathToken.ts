import { PathAlternativeToken } from "./PathAlternativeToken";
import { PathEltToken } from "./PathEltToken";
import { PathInverseToken } from "./PathInverseToken";
import { PathSequenceToken } from "./PathSequenceToken";


/**
 * Alias to the every token that is considered a path.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPath}
 */
export type PathToken = PathEltToken | PathInverseToken | PathSequenceToken | PathAlternativeToken;

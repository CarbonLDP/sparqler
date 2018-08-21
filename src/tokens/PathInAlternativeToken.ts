import { PathEltToken } from "./PathEltToken";
import { PathInverseToken } from "./PathInverseToken";
import { PathSequenceToken } from "./PathSequenceToken";


/**
 * Alias for the path used by {@link PathAlternativeToken}.
 */
export type PathInAlternativeToken = PathEltToken | PathInverseToken | PathSequenceToken;

import { ObjectToken } from "./ObjectToken";
import { SubjectToken } from "./SubjectToken";


/**
 * Alias for a more accurate naming of the triple tokens.
 */
export type TripleToken<T extends ObjectToken = ObjectToken> = SubjectToken<T>;

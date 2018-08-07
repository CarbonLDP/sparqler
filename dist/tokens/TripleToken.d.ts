import { ObjectToken } from "./ObjectToken";
import { SubjectToken } from "./SubjectToken";
export declare type TripleToken<T extends ObjectToken = ObjectToken> = SubjectToken<T>;

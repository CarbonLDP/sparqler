import { ObjectToken } from "sparqler/tokens/ObjectToken";
import { SubjectToken } from "./SubjectToken";


export type TripleToken<T extends ObjectToken = ObjectToken> = SubjectToken<T>;

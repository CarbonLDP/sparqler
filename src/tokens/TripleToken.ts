import { SubjectToken } from "./SubjectToken";
import { TermToken } from "./TermToken";
import { VariableToken } from "./VariableToken";


export type TripleToken<T extends VariableToken | TermToken = VariableToken | TermToken> = SubjectToken<T>;
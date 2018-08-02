import { NotTripleToken } from "./NotTripleToken";
import { SubSelectToken } from "./SubSelectToken";
import { TripleToken } from "./TripleToken";


export type PatternToken = SubSelectToken | TripleToken | NotTripleToken;
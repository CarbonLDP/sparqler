import { NotTripleToken, TripleToken } from "sparqler/tokens";
import { SubSelectToken } from "./SubSelectToken";


export type PatternToken = SubSelectToken | TripleToken | NotTripleToken;
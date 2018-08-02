import { BlankNodeToken } from "./BlankNodeToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";


export type TermToken = IRIToken | PrefixedNameToken | BlankNodeToken | LiteralToken;

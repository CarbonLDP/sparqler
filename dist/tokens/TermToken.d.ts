import { BlankNodeToken } from "./BlankNodeToken";
import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { RDFLiteralToken } from "./RDFLiteralToken";
export declare type TermToken = IRIToken | RDFLiteralToken | LiteralToken | BlankNodeToken;

import { IRIToken } from "./IRIToken";
import { LanguageToken } from "./LanguageToken";
import { LiteralToken } from "./LiteralToken";
export declare class RDFLiteralToken extends LiteralToken {
    readonly value: string;
    readonly type?: IRIToken;
    readonly language?: LanguageToken;
    constructor(value: string, type?: IRIToken);
    constructor(value: string, language?: LanguageToken);
    toString(spaces?: number): string;
}

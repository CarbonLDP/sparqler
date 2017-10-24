import { BooleanToken } from "./BooleanToken";
import { IRIToken } from "./IRIToken";
import { LanguageToken } from "./LanguageToken";
import { NumberToken } from "./NumberToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { StringToken } from "./StringToken";
import { TokenNode } from "./TokenNode";
export declare class LiteralToken implements TokenNode {
    readonly token: "literal";
    value?: NumberToken | BooleanToken | StringToken;
    type?: IRIToken | PrefixedNameToken;
    language?: LanguageToken;
    constructor(value?: boolean | number | string);
    setValue(value: boolean | number | string): void;
    setType(type: string | IRIToken | PrefixedNameToken): void;
    setLanguage(language: string): void;
    toString(): string;
}

import { TokenNode } from "./TokenNode";
export declare function isLanguageTag(tag: string): boolean;
export declare class LanguageToken implements TokenNode {
    readonly token: "language";
    readonly tag: string;
    constructor(tag: string);
    toString(): string;
}

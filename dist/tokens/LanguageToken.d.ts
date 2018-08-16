import { TokenNode } from "./TokenNode";
export declare class LanguageToken implements TokenNode {
    readonly token: "language";
    readonly tag: string;
    constructor(tag: string);
    toString(spaces?: number): string;
}

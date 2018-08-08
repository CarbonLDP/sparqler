import { TokenNode } from "./TokenNode";
export declare class PrefixedNameToken implements TokenNode {
    readonly token: "prefixedName";
    readonly namespace: string;
    readonly localName: string;
    constructor(prefixedName: string);
    constructor(namespace: string, localName: string);
    toString(spaces?: number): string;
}

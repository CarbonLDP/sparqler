import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";
export declare class PrefixToken implements TokenNode {
    readonly token: "prefix";
    readonly namespace: string;
    readonly iri: IRIToken;
    constructor(namespace: string, iri: IRIToken);
    toString(spaces?: number): string;
}

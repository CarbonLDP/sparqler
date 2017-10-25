import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";
export declare class PrefixToken implements TokenNode {
    readonly token: "prefix";
    readonly name: string;
    readonly iri: IRIToken;
    constructor(name: string, iri: IRIToken);
    toString(): string;
}

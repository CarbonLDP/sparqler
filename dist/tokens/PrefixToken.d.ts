import { IRIRefToken } from "./IRIRefToken";
import { TokenNode } from "./TokenNode";
export declare class PrefixToken implements TokenNode {
    readonly token: "prefix";
    readonly namespace: string;
    readonly iri: IRIRefToken;
    constructor(namespace: string, iri: IRIRefToken);
    toString(spaces?: number): string;
}

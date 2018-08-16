import { IRIRefToken } from "./IRIRefToken";
import { TokenNode } from "./TokenNode";
export declare class BaseToken implements TokenNode {
    readonly token: "base";
    readonly iri: IRIRefToken;
    constructor(iri: IRIRefToken);
    toString(): string;
}

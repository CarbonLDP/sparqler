import { IRIToken } from "./IRIToken";
import { TokenNode } from "./TokenNode";
export declare class BaseToken implements TokenNode {
    readonly token: "base";
    readonly iri: IRIToken;
    constructor(iri: IRIToken);
    toString(): string;
}

import { TokenNode } from "./TokenNode";
export declare class IRIToken implements TokenNode {
    readonly token: "iri";
    readonly value: string;
    constructor(value: string);
    toString(): string;
}

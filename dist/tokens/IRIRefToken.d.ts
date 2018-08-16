import { TokenNode } from "./TokenNode";
export declare class IRIRefToken implements TokenNode {
    readonly token: "iri";
    readonly value: string;
    constructor(value: string);
    toString(spaces?: number): string;
}

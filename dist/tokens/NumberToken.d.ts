import { TokenNode } from "./TokenNode";
export declare class NumberToken implements TokenNode {
    readonly token: "number";
    readonly value: number;
    constructor(value: number);
    toString(spaces?: number): string;
}

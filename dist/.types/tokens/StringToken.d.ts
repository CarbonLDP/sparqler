import { TokenNode } from "./TokenNode";
export declare class StringToken implements TokenNode {
    readonly token: "string";
    readonly value: string;
    constructor(value: string);
    toString(): string;
}

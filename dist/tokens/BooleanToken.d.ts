import { TokenNode } from "./TokenNode";
export declare class BooleanToken implements TokenNode {
    readonly token: "boolean";
    readonly value: boolean;
    constructor(value: boolean);
    toString(): string;
}

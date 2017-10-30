import { TokenNode } from "./TokenNode";
export declare class LimitToken implements TokenNode {
    readonly token: "limit";
    readonly value: number;
    constructor(value: number);
    toString(): string;
}

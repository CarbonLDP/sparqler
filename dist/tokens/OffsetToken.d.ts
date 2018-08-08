import { TokenNode } from "./TokenNode";
export declare class OffsetToken implements TokenNode {
    readonly token: "offset";
    readonly value: number;
    constructor(value: number);
    toString(spaces?: number): string;
}

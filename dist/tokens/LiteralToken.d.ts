import { TokenNode } from "./TokenNode";
export declare class LiteralToken implements TokenNode {
    readonly token: "literal";
    readonly value: boolean | number | string;
    constructor(value: boolean | number | string);
    toString(spaces?: number): string;
}

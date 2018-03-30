import { TokenNode } from "./TokenNode";
export declare class VariableToken implements TokenNode {
    readonly token: "variable";
    readonly name: string;
    constructor(name: string);
    toString(): string;
}

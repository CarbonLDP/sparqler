import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class BindToken implements TokenNode {
    readonly token: "bind";
    readonly expression: string;
    readonly variable: VariableToken;
    constructor(expression: string, variable: VariableToken);
    toString(): string;
}

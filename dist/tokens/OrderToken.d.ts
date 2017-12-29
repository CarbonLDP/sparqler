import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class OrderToken implements TokenNode {
    readonly token: "order";
    readonly condition: VariableToken | string;
    readonly flow?: string;
    constructor(condition: VariableToken | string, flow?: "ASC" | "DESC");
    toString(): string;
}

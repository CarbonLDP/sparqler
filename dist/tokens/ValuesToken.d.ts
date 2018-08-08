import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class ValuesToken implements TokenNode {
    readonly token: "values";
    readonly variables: VariableToken[];
    readonly values: (IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[][];
    constructor();
    addValues(variable: VariableToken, ...values: (IRIToken | PrefixedNameToken | LiteralToken | "UNDEF")[]): this;
    toString(spaces?: number): string;
    private _getVariablesStr;
    private _getValuesStr;
}

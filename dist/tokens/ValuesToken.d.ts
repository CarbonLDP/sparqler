import { IRIToken } from "./IRIToken";
import { LiteralToken } from "./LiteralToken";
import { RDFLiteralToken } from "./RDFLiteralToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class ValuesToken implements TokenNode {
    readonly token: "values";
    readonly variables: VariableToken[];
    readonly values: (IRIToken | RDFLiteralToken | LiteralToken | "UNDEF")[][];
    constructor();
    addVariables(...variables: VariableToken[]): this;
    addValues(...values: (IRIToken | LiteralToken | "UNDEF")[]): this;
    toString(spaces?: number): string;
    private _getVariablesStr;
    private _getValuesStr;
}

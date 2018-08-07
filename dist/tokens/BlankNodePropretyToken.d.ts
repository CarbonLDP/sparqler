import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";
export declare class BlankNodePropretyToken implements TokenNode {
    readonly token: "blankNodeTriple";
    readonly properties: PropertyToken[];
    constructor();
    toString(): string;
}

import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";
export declare class BlankNodePropertyToken implements TokenNode {
    readonly token: "blankNodeProperty";
    readonly properties: PropertyToken[];
    constructor();
    addProperty(property: PropertyToken): this;
    toString(spaces?: number): string;
}

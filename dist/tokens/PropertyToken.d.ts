import { ObjectToken } from "./ObjectToken";
import { TokenNode } from "./TokenNode";
import { VariableOrIRIToken } from "./VariableOrIRIToken";
export declare class PropertyToken implements TokenNode {
    readonly token: "property";
    readonly verb: VariableOrIRIToken | "a";
    readonly objects: ObjectToken[];
    constructor(verb: VariableOrIRIToken | "a");
    addObject(...object: ObjectToken[]): this;
    toString(): string;
}

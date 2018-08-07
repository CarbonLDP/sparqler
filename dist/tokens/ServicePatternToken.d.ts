import { GroupPatternToken } from "./GroupPatternToken";
import { TokenNode } from "./TokenNode";
import { VariableOrIRIToken } from "./VariableOrIRIToken";
export declare class ServicePatternToken implements TokenNode {
    readonly token: "servicePattern";
    readonly modifier?: "SILENT";
    readonly resource: VariableOrIRIToken;
    readonly groupPattern: GroupPatternToken;
    constructor(resource: VariableOrIRIToken, modifier?: "SILENT");
    toString(): string;
}

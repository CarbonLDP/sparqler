import { VariableOrIRIToken } from "./VariableOrIRIToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";
export declare class GraphToken implements TokenNode {
    readonly token: "graph";
    readonly graph: VariableOrIRIToken;
    readonly groupPattern: GroupPatternToken;
    constructor(graph: VariableOrIRIToken);
    addPattern(...pattern: PatternToken[]): this;
    toString(): string;
}

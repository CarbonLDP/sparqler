import { VariableOrIRI } from "./";
import { GroupPatternToken } from "./GroupPatternToken";
import { PatternToken } from "./PatternToken";
import { TokenNode } from "./TokenNode";
export declare class GraphToken implements TokenNode {
    readonly token: "graph";
    readonly graph: VariableOrIRI;
    readonly groupPattern: GroupPatternToken;
    constructor(graph: VariableOrIRI);
    addPattern(...pattern: PatternToken[]): this;
    toString(): string;
}

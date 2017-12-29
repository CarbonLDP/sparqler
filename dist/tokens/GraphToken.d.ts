import { PatternToken, VariableOrIRI } from "./";
import { TokenNode } from "./TokenNode";
export declare class GraphToken implements TokenNode {
    readonly token: "graph";
    readonly graph: VariableOrIRI;
    readonly patterns: PatternToken[];
    constructor(graph: VariableOrIRI);
    addPattern(...pattern: PatternToken[]): this;
    toString(): string;
}

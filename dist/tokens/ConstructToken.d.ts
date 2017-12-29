import { PatternToken, SolutionModifier, TripleToken } from "./";
import { TokenNode } from "./TokenNode";
export declare class ConstructToken implements TokenNode {
    readonly token: "construct";
    readonly triples: TripleToken[];
    readonly patterns: PatternToken[];
    readonly modifiers: SolutionModifier[];
    constructor();
    addTriple(...triple: TripleToken[]): this;
    addPattern(...patterns: PatternToken[]): this;
    addModifier(...modifiers: SolutionModifier[]): this;
    toString(): string;
}

import { PatternToken, TripleToken } from "./";
import { TokenNode } from "./TokenNode";
export declare class ConstructToken implements TokenNode {
    readonly token: "construct";
    readonly triples: TripleToken[];
    readonly patterns: PatternToken[];
    constructor();
    addTriple(...triple: TripleToken[]): this;
    addPattern(...patterns: PatternToken[]): this;
    toString(): string;
}

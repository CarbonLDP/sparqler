import { SharedQueryClauseToken } from "./SharedQueryClauseToken";
import { TripleToken } from "./TripleToken";
export declare class ConstructToken extends SharedQueryClauseToken {
    readonly token: "construct";
    readonly triples: TripleToken[];
    constructor();
    addTriple(...triple: TripleToken[]): this;
    toString(spaces?: number): string;
}

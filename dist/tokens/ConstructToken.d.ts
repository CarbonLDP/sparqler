import { TripleToken } from "./";
import { CommonQueryClauseToken } from "./CommonQueryClauseToken";
export declare class ConstructToken extends CommonQueryClauseToken {
    readonly token: "construct";
    readonly triples: TripleToken[];
    constructor();
    addTriple(...triple: TripleToken[]): this;
    toString(): string;
}

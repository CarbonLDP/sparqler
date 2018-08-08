import { CommonQueryClauseToken } from "./CommonQueryClauseToken";
import { TripleToken } from "./TripleToken";
export declare class ConstructToken extends CommonQueryClauseToken {
    readonly token: "construct";
    readonly triples: TripleToken[];
    constructor();
    addTriple(...triple: TripleToken[]): this;
    toString(spaces?: number): string;
}

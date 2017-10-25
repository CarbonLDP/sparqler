import { TermToken } from "./";
import { PredicateToken } from "./PredicateToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class SubjectToken implements TokenNode {
    readonly token: "subject";
    readonly subject: VariableToken | TermToken;
    readonly predicates: PredicateToken[];
    constructor(subject: VariableToken | TermToken);
    addPredicate(predicate: PredicateToken): this;
    toString(): string;
}

import { PropertyToken } from "./PropertyToken";
import { TokenNode } from "./TokenNode";
import { TripleNodeToken } from "./TripleNodeToken";
import { VariableOrTermToken } from "./VariableOrTermToken";
export declare class SubjectToken<T extends VariableOrTermToken | TripleNodeToken = VariableOrTermToken | TripleNodeToken> implements TokenNode {
    readonly token: "subject";
    readonly subject: T;
    readonly properties: PropertyToken[];
    constructor(subject: T);
    addPredicate(predicate: PropertyToken): this;
    toString(spaces?: number): string;
}

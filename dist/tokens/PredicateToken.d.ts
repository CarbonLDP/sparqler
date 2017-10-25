import { TermToken } from "./";
import { IRIToken } from "./IRIToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { TokenNode } from "./TokenNode";
import { VariableToken } from "./VariableToken";
export declare class PredicateToken implements TokenNode {
    readonly token: "predicate";
    readonly predicate: VariableToken | IRIToken | PrefixedNameToken | "a";
    readonly objects: (VariableToken | TermToken)[];
    constructor(predicate: VariableToken | IRIToken | PrefixedNameToken | "a");
    addObject(object: VariableToken | TermToken): this;
    toString(): string;
}

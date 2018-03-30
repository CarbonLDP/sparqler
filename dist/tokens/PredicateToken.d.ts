import { ObjectToken, VariableOrIRI } from "./";
import { TokenNode } from "./TokenNode";
export declare class PredicateToken implements TokenNode {
    readonly token: "predicate";
    readonly predicate: VariableOrIRI | "a";
    readonly objects: ObjectToken[];
    constructor(predicate: VariableOrIRI | "a");
    addObject(object: ObjectToken): this;
    toString(): string;
}

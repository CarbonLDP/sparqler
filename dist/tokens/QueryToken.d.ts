import { BaseToken } from "./BaseToken";
import { ConstructToken } from "./ConstructToken";
import { PrefixToken } from "./PrefixToken";
import { TokenNode } from "./TokenNode";
import { ValuesToken } from "./ValuesToken";
export declare class QueryToken implements TokenNode {
    readonly token: "query";
    readonly prologues: (BaseToken | PrefixToken)[];
    readonly query: ConstructToken;
    readonly values?: ValuesToken;
    constructor(query: ConstructToken, values?: ValuesToken);
    addPrologues(...prologues: (BaseToken | PrefixToken)[]): this;
    toString(): string;
}

import { BaseToken } from "./BaseToken";
import { PrefixToken } from "./PrefixToken";
import { QueryClauseToken } from "./QueryClauseToken";
import { TokenNode } from "./TokenNode";
import { ValuesToken } from "./ValuesToken";
export declare class QueryToken implements TokenNode {
    readonly token: "query";
    readonly prologues: (BaseToken | PrefixToken)[];
    readonly queryClause: QueryClauseToken;
    readonly values?: ValuesToken;
    constructor(query: QueryClauseToken, values?: ValuesToken);
    addPrologues(...prologues: (BaseToken | PrefixToken)[]): this;
    toString(): string;
}

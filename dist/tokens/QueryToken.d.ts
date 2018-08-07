import { BaseToken } from "./BaseToken";
import { PrefixToken } from "./PrefixToken";
import { QueryClauseToken } from "./QueryClauseToken";
import { TokenNode } from "./TokenNode";
import { ValuesToken } from "./ValuesToken";
export declare class QueryToken<T extends QueryClauseToken | undefined = QueryClauseToken | undefined> implements TokenNode {
    readonly token: "query";
    readonly prologues: (BaseToken | PrefixToken)[];
    readonly queryClause: T;
    readonly values?: ValuesToken;
    constructor(query: T, values?: ValuesToken);
    addPrologues(...prologues: (BaseToken | PrefixToken)[]): this;
    toString(): string;
}

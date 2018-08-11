import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
export interface LimitClause<T extends object> {
    limit(limit: number): T;
}
export declare const LimitClause: {
    createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends object, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & LimitClause<T>;
};

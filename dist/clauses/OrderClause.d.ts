import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
import { LimitOffsetClause } from "./LimitOffsetClause";
export interface OrderClause<T extends FinishClause> extends LimitOffsetClause<T> {
    orderBy(rawCondition: string): LimitOffsetClause<T> & T;
}
export declare const OrderClause: {
    createFrom<C extends Container<QueryToken<QueryClauseToken> | SubSelectToken>, T extends FinishClause, O extends object>(genericFactory: Factory<typeof container, T>, container: C, object: O): O & OrderClause<T>;
};

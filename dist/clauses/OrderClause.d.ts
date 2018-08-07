import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
import { LimitOffsetClause } from "./LimitOffsetClause";
export interface OrderClause<T extends FinishClause> extends LimitOffsetClause<T> {
    orderBy(rawCondition: string): LimitOffsetClause<T> & T;
}
export declare const OrderClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken<import("sparqler/tokens/QueryClauseToken").QueryClauseToken>>, T extends FinishClause, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & OrderClause<T>;
};

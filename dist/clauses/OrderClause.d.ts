import { FinishClause } from "./FinishClause";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { SubFinishClause } from "./interfaces";
import { LimitOffsetClause } from "./LimitOffsetClause";
export interface OrderClause<T extends FinishClause | SubFinishClause> extends LimitOffsetClause<T> {
    orderBy(rawCondition: string): LimitOffsetClause<T> & T;
}
export declare const OrderClause: {
    create<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause | SubFinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & OrderClause<T>;
};

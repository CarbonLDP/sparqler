import { FinishClause } from "./FinishClause";
import { SubSelectToken } from "./../tokens/SubSelectToken";
import { QueryToken } from "../tokens/QueryToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { SubFinishClause } from "./interfaces";
import { LimitClause } from "./LimitClause";
import { OffsetClause } from "./OffsetClause";
import { ValuesClause } from "./ValuesClause";
export interface LimitOffsetClause<T extends FinishClause | SubFinishClause> extends LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>, OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>, ValuesClause<T> {
}
export declare const LimitOffsetClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause | SubFinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & LimitOffsetClause<T>;
};

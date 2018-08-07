import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
import { LimitClause } from "./LimitClause";
import { OffsetClause } from "./OffsetClause";
import { ValuesClause } from "./ValuesClause";
export interface LimitOffsetClause<T extends FinishClause> extends LimitClause<OffsetClause<ValuesClause<T> & T> & ValuesClause<T> & T>, OffsetClause<LimitClause<ValuesClause<T> & T> & ValuesClause<T> & T>, ValuesClause<T> {
}
export declare const LimitOffsetClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken<import("sparqler/tokens/QueryClauseToken").QueryClauseToken>>, T extends FinishClause, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & LimitOffsetClause<T>;
};

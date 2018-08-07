import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
import { OrderClause } from "./OrderClause";
export interface HavingClause<T extends FinishClause> extends OrderClause<T> {
    having(rawCondition: string): OrderClause<T> & T;
}
export declare const HavingClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken<import("sparqler/tokens/QueryClauseToken").QueryClauseToken>>, T extends FinishClause, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & HavingClause<T>;
};

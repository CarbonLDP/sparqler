import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { SubFinishClause } from "./interfaces";
import { OrderClause } from "./OrderClause";
export interface HavingClause<T extends FinishClause | SubFinishClause> extends OrderClause<T> {
    having(rawCondition: string): OrderClause<T> & T;
}
export declare const HavingClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause | SubFinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & HavingClause<T>;
};

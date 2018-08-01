import { FinishClause } from "./FinishClause";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { HavingClause } from "./HavingClause";
import { SubFinishClause } from "./interfaces";
export interface GroupClause<T extends FinishClause | SubFinishClause> extends HavingClause<T> {
    groupBy(rawCondition: string): HavingClause<T> & T;
}
export declare const GroupClause: {
    create<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause | SubFinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & GroupClause<T>;
};

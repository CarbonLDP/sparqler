import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
import { HavingClause } from "./HavingClause";
export interface GroupClause<T extends FinishClause> extends HavingClause<T> {
    groupBy(rawCondition: string): HavingClause<T> & T;
}
export declare const GroupClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause, O extends object>(genericFactory: Factory<typeof container, T>, container: C, object: O): O & GroupClause<T>;
};

import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
import { HavingClause } from "./HavingClause";
export interface GroupClause<T extends FinishClause> extends HavingClause<T> {
    groupBy(rawCondition: string): HavingClause<T> & T;
}
export declare const GroupClause: {
    createFrom<C extends Container<SubSelectToken | QueryToken<QueryClauseToken>>, T extends FinishClause, O extends object>(genericFactory: Factory<typeof container, T>, container: C, object: O): O & GroupClause<T>;
};

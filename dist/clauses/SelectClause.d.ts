import { QueryToken } from "../tokens/QueryToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { FromClause } from "./FormClause";
export interface SelectClause<T extends FinishClause> {
    select(...variables: string[]): FromClause<T>;
    selectDistinct(...variables: string[]): FromClause<T>;
    selectReduced(...variables: string[]): FromClause<T>;
    selectAll(): FromClause<T>;
    selectAllDistinct(): FromClause<T>;
    selectAllReduced(): FromClause<T>;
}
export declare const SelectClause: {
    create<C extends Container2<QueryToken>, T extends FinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & SelectClause<T>;
};

import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { FinishClause } from "./FinishClause";
import { FromClause } from "./FromClause";
export interface SelectClause<T extends FinishClause> {
    select(...variables: string[]): FromClause<T>;
    selectDistinct(...variables: string[]): FromClause<T>;
    selectReduced(...variables: string[]): FromClause<T>;
    selectAll(): FromClause<T>;
    selectAllDistinct(): FromClause<T>;
    selectAllReduced(): FromClause<T>;
}
export declare const SelectClause: {
    createFrom<C extends Container2<QueryToken>, T extends FinishClause, O extends object>(genericFactory: Factory<Container2<QueryToken<SelectToken>>, T>, container: C, object: O): O & SelectClause<T>;
};

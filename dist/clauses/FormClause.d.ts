import { QueryToken } from "../tokens/QueryToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { WhereClause } from "./WhereClause";
export interface FromClause<T extends FinishClause> extends WhereClause<T> {
    from(iri: string): FromClause<T>;
    fromNamed(iri: string): FromClause<T>;
}
export declare const FromClause: {
    create<C extends Container2<QueryToken>, T extends FinishClause, O extends object>(genericFactory: ClauseFactory<C, T>, container: C, object: O): O & FromClause<T>;
};

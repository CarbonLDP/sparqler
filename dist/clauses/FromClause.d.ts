import { SelectToken } from "./../tokens";
import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { QueryToken } from "../tokens/QueryToken";
import { FinishClause } from "./FinishClause";
import { WhereClause } from "./WhereClause";
export interface FromClause<T extends FinishClause> extends WhereClause<T> {
    from(iri: string): FromClause<T>;
    fromNamed(iri: string): FromClause<T>;
}
export declare const FromClause: {
    createFrom<C extends Container2<QueryToken<SelectToken>>, T extends FinishClause, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & FromClause<T>;
};

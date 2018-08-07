import { QueryUnitContainer } from "../data/QueryUnitContainer";
import { FinishClause } from "./FinishClause";
import { SelectClause } from "./SelectClause";
export interface QueryClause<T extends FinishClause> extends SelectClause<T> {
    base(iri: string): QueryClause<T>;
    vocab(iri: string): QueryClause<T>;
    prefix(name: string, iri: string): QueryClause<T>;
}
export declare const QueryClause: {
    createFrom<C extends QueryUnitContainer<SELECT>, SELECT extends FinishClause, T extends object>(container: C, object: T): T & QueryClause<SELECT>;
};

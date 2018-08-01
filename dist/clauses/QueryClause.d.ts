import { FinishClause } from "./FinishClause";
import { QueryUnitContainer } from "./QueryUnitContainer";
import { SelectClause } from "./SelectClause";
export interface QueryClause<T extends FinishClause> extends SelectClause<T> {
    base(iri: string): QueryClause<T>;
    vocab(iri: string): QueryClause<T>;
    prefix(name: string, iri: string): QueryClause<T>;
}
export declare const QueryClauseFactory: {
    create<C extends QueryUnitContainer<SELECT>, SELECT extends FinishClause, T extends object>(container: C, object: T): T & QueryClause<SELECT>;
};

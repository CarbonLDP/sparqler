import { FinishClause, QueryClause } from "sparqler/clauses/interfaces";
import { Container } from "sparqler/clauses/Container";
import { FromClause } from "sparqler/clauses";
export interface FinishDecorator<T> extends Function {
    <W extends object>(container: Container<T & FinishClause>, object: W): T & W & FinishClause;
}
export declare class SPARQLER<T extends FinishClause = FinishClause> implements QueryClause<T> {
    base: (iri: string) => QueryClause<T>;
    vocab: (iri: string) => QueryClause<T>;
    prefix: (name: string, iri: string) => QueryClause<T>;
    select: (...variables: string[]) => FromClause<T>;
    selectDistinct: (...variables: string[]) => FromClause<T>;
    selectReduced: (...variables: string[]) => FromClause<T>;
    selectAll: () => FromClause<T>;
    selectAllDistinct: () => FromClause<T>;
    selectAllReduced: () => FromClause<T>;
    constructor(finishDecorator?: FinishDecorator<T>);
}
export default SPARQLER;

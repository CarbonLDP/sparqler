import { Container, FinishClause, QueryClause } from "sparqler/clauses";
export declare function queryDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & QueryClause<T>;

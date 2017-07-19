import { FinishClause, QueryClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
export declare function queryDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & QueryClause<T>;

import { Container, FinishClause, WhereClause } from "sparqler/clauses";
import { GraphPattern } from "sparqler/patterns";
export declare function whereDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & WhereClause<T>;

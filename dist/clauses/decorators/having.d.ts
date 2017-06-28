import { Container, FinishClause, HavingClause } from "sparqler/clauses";
import { GraphPattern } from "sparqler/patterns";
export declare function havingDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & HavingClause<T>;

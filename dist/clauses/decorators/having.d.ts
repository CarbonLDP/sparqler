import { Container } from "sparqler/clauses/Container";
import { FinishClause, HavingClause, SubFinishClause } from "sparqler/clauses/interfaces";
export declare function havingDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & HavingClause<T>;

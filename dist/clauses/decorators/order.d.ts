import { Container } from "sparqler/clauses/Container";
import { FinishClause, OrderClause, SubFinishClause } from "sparqler/clauses/interfaces";
export declare function orderDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & OrderClause<T>;

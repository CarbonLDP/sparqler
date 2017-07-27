import { FinishClause, GroupClause, SubFinishClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
export declare function groupDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & GroupClause<T>;

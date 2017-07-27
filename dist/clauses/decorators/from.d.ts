import { FinishClause, FromClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
export declare function fromDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & FromClause<T>;

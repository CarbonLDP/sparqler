import { Container, FinishClause, FromClause } from "sparqler/clauses";
export declare function fromDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & FromClause<T>;

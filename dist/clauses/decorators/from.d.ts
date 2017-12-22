import { Container } from "../Container";
import { FinishClause, FromClause } from "../interfaces";
export declare function fromDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & FromClause<T>;

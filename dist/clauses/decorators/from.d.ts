import { FinishClause, FromClause } from "./..";
import { Container } from "./../Container";
export declare function fromDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & FromClause<T>;
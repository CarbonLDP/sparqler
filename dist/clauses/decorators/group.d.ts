import { FinishClause, GroupClause, SubFinishClause } from "./..";
import { Container } from "./../Container";
export declare function groupDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & GroupClause<T>;

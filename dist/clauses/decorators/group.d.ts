import { Container } from "../Container";
import { FinishClause, GroupClause, SubFinishClause } from "../interfaces";
export declare function groupDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & GroupClause<T>;

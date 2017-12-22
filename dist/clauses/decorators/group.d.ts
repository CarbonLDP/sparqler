import { Container, FinishClause, GroupClause, SubFinishClause } from "../";
export declare function groupDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & GroupClause<T>;

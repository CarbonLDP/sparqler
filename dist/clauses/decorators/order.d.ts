import { Container } from "../Container";
import { FinishClause, OrderClause, SubFinishClause } from "../interfaces";
export declare function orderDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & OrderClause<T>;

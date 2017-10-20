import { Container } from "./../Container";
import { FinishClause, LimitOffsetClause, OrderClause, SubFinishClause } from "./../interfaces";
export declare function orderBy<T extends FinishClause | SubFinishClause>(this: Container<T>, rawCondition: string): LimitOffsetClause<T> & T;
export declare function orderDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & OrderClause<T>;

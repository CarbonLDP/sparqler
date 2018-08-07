import { Container } from "./../Container";
import { FinishClause } from "./../interfaces";
import { SubFinishClause } from "./../interfaces";
import { LimitOffsetClause } from "./../interfaces";
import { OrderClause } from "./../interfaces";
export declare function orderBy<T extends FinishClause | SubFinishClause>(this: Container<T>, rawCondition: string): LimitOffsetClause<T> & T;
export declare function orderDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & OrderClause<T>;

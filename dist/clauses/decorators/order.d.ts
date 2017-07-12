import { Container, FinishClause, LimitOffsetClause, OrderClause } from "sparqler/clauses";
import { GraphPattern } from "sparqler/patterns";
export declare function orderBy<T extends FinishClause | GraphPattern>(this: Container<T>, rawCondition: string): LimitOffsetClause<T> & T;
export declare function orderDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & OrderClause<T>;
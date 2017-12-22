import { Container } from "../Container";
import { FinishClause, SubFinishClause, SubWhereClause, WhereClause } from "../interfaces";
export declare function whereDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & WhereClause<T>;
export declare function subWhereDecorator<T extends SubFinishClause, W extends object>(container: Container<T>, object: W): W & SubWhereClause;

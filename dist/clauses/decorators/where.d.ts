import { SubFinishClause } from "./..";
import { Container } from "./../Container";
import { FinishClause } from "./../FinishClause";
import { SubWhereClause } from "./../interfaces";
import { WhereClause } from "./../WhereClause";
export declare function whereDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & WhereClause<T>;
export declare function subWhereDecorator<T extends SubFinishClause, W extends object>(container: Container<T>, object: W): W & SubWhereClause;

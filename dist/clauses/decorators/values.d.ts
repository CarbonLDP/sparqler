import { ValuesClause } from "./..";
import { Container } from "./../Container";
import { FinishClause } from "./../FinishClause";
import { SubFinishClause } from "./../interfaces";
export declare function valuesDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & ValuesClause<T>;

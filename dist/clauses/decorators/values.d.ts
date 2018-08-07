import { ValuesClause } from "./../interfaces";
import { Container } from "./../Container";
import { FinishClause } from "./../interfaces";
import { SubFinishClause } from "./../interfaces";
export declare function valuesDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & ValuesClause<T>;

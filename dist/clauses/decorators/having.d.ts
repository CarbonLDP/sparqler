import { Container } from "./../Container";
import { FinishClause } from "./../interfaces";
import { HavingClause } from "./../interfaces";
import { SubFinishClause } from "./../interfaces";
export declare function havingDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & HavingClause<T>;

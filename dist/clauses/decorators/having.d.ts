import { Container } from "./../Container";
import { FinishClause } from "./../FinishClause";
import { HavingClause } from "./../HavingClause";
import { SubFinishClause } from "./../interfaces";
export declare function havingDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & HavingClause<T>;

import { Container } from "./../Container";
import { FinishClause } from "./../FinishClause";
import { QueryClause } from "./../QueryClause";
export declare function queryDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & QueryClause<T>;

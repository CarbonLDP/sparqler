import { Container } from "../Container";
import { FinishClause, QueryClause } from "../interfaces";
export declare function queryDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & QueryClause<T>;

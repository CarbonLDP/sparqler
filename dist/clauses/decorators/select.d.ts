import { Container } from "./../Container";
import { FinishClause } from "./../FinishClause";
import { SubFinishClause, SubSelectClause } from "./../interfaces";
import { SelectClause } from "./../SelectClause";
export declare function selectDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & SelectClause<T>;
export declare function selectDecorator<W extends object>(container: Container<SubFinishClause>, object: W): W & SubSelectClause;

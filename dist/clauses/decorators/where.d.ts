import { SubFinishClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import { FinishClause, SubWhereClause, WhereClause } from "sparqler/clauses/interfaces";
export declare function whereDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & WhereClause<T>;
export declare function subWhereDecorator<T extends SubFinishClause, W extends object>(container: Container<T>, object: W): W & SubWhereClause;

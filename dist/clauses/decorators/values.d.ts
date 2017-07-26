import { ValuesClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import { FinishClause, SubFinishClause } from "sparqler/clauses/interfaces";
export declare function valuesDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & ValuesClause<T>;

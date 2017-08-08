import { SubFinishClause } from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
export declare function subFinishDecorator<W extends object>(container: Container<SubFinishClause>, object: W): W & SubFinishClause;

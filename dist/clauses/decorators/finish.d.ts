import { Container, FinishClause } from "sparqler/clauses";
export declare function finishDecorator<W extends object>(container: Container<FinishClause>, object: W): W & FinishClause;

import { FinishClause, QueryClause } from "sparqler/clauses/interfaces";
import { Container } from "sparqler/clauses/Container";
export interface FinishDecorator<T> extends Function {
    <W extends object>(container: Container<T & FinishClause>, object: W): T & W & FinishClause;
}
export interface SPARQLER<T extends FinishClause = FinishClause> extends QueryClause<T> {
}
export declare class SPARQLER<T extends FinishClause = FinishClause> {
    constructor(finishDecorator?: FinishDecorator<T>);
}
export default SPARQLER;

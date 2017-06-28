import { Container, FinishClause, QueryClause } from "sparqler/clauses";
export interface FinishDecorator<T extends FinishClause> extends Function {
    <W extends object>(container: Container<T>, object: W): T & W;
}
export interface SPARQLER<T extends FinishClause = FinishClause> extends QueryClause<T> {
}
export declare class SPARQLER<T extends FinishClause = FinishClause> {
    constructor(finishDecorator?: FinishDecorator<T>);
}
export default SPARQLER;

import { Container } from "./clauses/Container";
import { FinishClause } from "./clauses/FinishClause";
import { QueryClause as QueryClause2 } from "./clauses/QueryClause";
import { QueryClause } from "./clauses/interfaces";
import { Container2 } from "./data/Container2";
import { Factory } from "./data/Factory";
import { QueryToken } from "./tokens";
export interface FinishDecorator<T> extends Function {
    <W extends object>(container: Container<T & FinishClause>, object: W): T & W & FinishClause;
}
export interface SPARQLER<T extends FinishClause = FinishClause> extends QueryClause<T> {
}
export declare class SPARQLER<T extends FinishClause = FinishClause> {
    constructor(finishDecorator?: FinishDecorator<T>);
}
export default SPARQLER;
export declare type FinishFactory<T extends FinishClause> = Factory<Container2<QueryToken>, T>;
export interface SPARQLER2<SELECT extends FinishClause = FinishClause> extends QueryClause2<SELECT> {
}
export declare class SPARQLER2<SELECT extends FinishClause = FinishClause> {
    constructor(finishSelectFactory?: FinishFactory<SELECT>);
}

import { FinishClause } from "./clauses/FinishClause";
import { QueryClause } from "./clauses/QueryClause";
import { Container2 } from "./data/Container2";
import { Factory } from "./data/Factory";
import { QueryToken } from "./tokens/QueryToken";
export declare type FinishFactory<T extends FinishClause> = Factory<Container2<QueryToken>, T>;
export interface SPARQLER<SELECT extends FinishClause = FinishClause> extends QueryClause<SELECT> {
}
export declare class SPARQLER<SELECT extends FinishClause = FinishClause> implements SPARQLER<SELECT> {
    constructor(finishSelectFactory?: FinishFactory<SELECT>);
}
export default SPARQLER;

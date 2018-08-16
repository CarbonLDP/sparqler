import { FinishClause } from "./clauses/FinishClause";
import { QueryClause } from "./clauses/QueryClause";
import { FinishFactory } from "./FinishFactory";
export interface SPARQLER<SELECT extends FinishClause = FinishClause> extends QueryClause<SELECT> {
}
export declare class SPARQLER<SELECT extends FinishClause = FinishClause> implements SPARQLER<SELECT> {
    constructor(finishSelectFactory?: FinishFactory<SELECT>);
}

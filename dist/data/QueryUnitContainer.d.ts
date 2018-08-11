import { FinishClause } from "../clauses/FinishClause";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";
import { Container, ContainerData } from "./Container";
import { Factory } from "./Factory";
export interface QueryUnitContainerData<SELECT extends FinishClause> extends ContainerData<QueryToken> {
    selectFinishClauseFactory: Factory<Container<any>, SELECT>;
}
export declare class QueryUnitContainer<SELECT extends FinishClause> extends Container<QueryToken> implements QueryUnitContainerData<SELECT> {
    readonly selectFinishClauseFactory: Factory<Container<QueryToken<SelectToken>>, SELECT>;
    constructor(data: QueryUnitContainerData<SELECT>);
}

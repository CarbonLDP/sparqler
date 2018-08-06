import { FinishClause } from "../clauses/FinishClause";

import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { Container2, ContainerData } from "./Container2";
import { Factory } from "./Factory";


export interface QueryUnitContainerData<SELECT extends FinishClause> extends ContainerData<QueryToken> {
	selectFinishClauseFactory:Factory<Container2<any>, SELECT>;
}


export class QueryUnitContainer<SELECT extends FinishClause> extends Container2<QueryToken> implements QueryUnitContainerData<SELECT> {
	readonly selectFinishClauseFactory:Factory<Container2<QueryToken<SelectToken>>, SELECT>;

	constructor( data:QueryUnitContainerData<SELECT> ) {
		super( data );

		this.selectFinishClauseFactory = data.selectFinishClauseFactory;
	}
}

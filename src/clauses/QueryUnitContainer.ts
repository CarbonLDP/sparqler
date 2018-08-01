import { QueryToken } from "../tokens/QueryToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2, ContainerData } from "./Container2";
import { FinishClause } from "./FinishClause";


export interface QueryUnitContainerData<SELECT extends FinishClause> extends ContainerData<QueryToken> {
	selectFinishClauseFactory:ClauseFactory<Container2<any>, SELECT>;
}


export class QueryUnitContainer<SELECT extends FinishClause> extends Container2<QueryToken> implements QueryUnitContainerData<SELECT> {
	readonly selectFinishClauseFactory:ClauseFactory<Container2<any>, SELECT>;

	constructor( data:QueryUnitContainerData<SELECT> ) {
		super( data );

		this.selectFinishClauseFactory = data.selectFinishClauseFactory;
	}
}

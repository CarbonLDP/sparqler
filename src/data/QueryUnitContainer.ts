import { FinishClause } from "../clauses/FinishClause";

import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { Container, ContainerData } from "./Container";
import { Factory } from "./Factory";


/**
 * Interface that describe the necessary data for the creation
 * of a {@link QueryUnitContainer}.
 */
export interface QueryUnitContainerData<SELECT extends FinishClause> extends ContainerData<QueryToken> {
	/**
	 * @see QueryUnitContainer.selectFinishClauseFactory
	 */
	selectFinishClauseFactory:Factory<Container<any>, SELECT>;
}


/**
 * Immutable class that contains the hidden data of the main query
 * statement.
 *
 * Extension of the {@link Container} that add the finish factories
 * for every type of type of query supported.
 */
export class QueryUnitContainer<SELECT extends FinishClause> extends Container<QueryToken> implements QueryUnitContainerData<SELECT> {
	/**
	 * The factory used for create the finish statement of a SELECT
	 * query.
	 */
	readonly selectFinishClauseFactory:Factory<Container<QueryToken<SelectToken>>, SELECT>;

	/**
	 * Constructor that receives and object with the base data of the
	 * container.
	 *
	 * @param data The base data for the container creation.
	 */
	constructor( data:QueryUnitContainerData<SELECT> ) {
		super( data );
		this.selectFinishClauseFactory = data.selectFinishClauseFactory;

		if( new.target === QueryUnitContainer ) Object.freeze( this );
	}
}

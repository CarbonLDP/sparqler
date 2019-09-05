import { FinishClause } from "../../clauses/FinishClause";
import { AskToken } from "../../tokens/AskToken";

import { QueryToken } from "../../tokens/QueryToken";
import { SelectToken } from "../../tokens/SelectToken";

import { Container, ContainerData } from "./Container";
import { Factory } from "../factories/Factory";


/**
 * Interface that describe the necessary data for the creation
 * of a {@link QueryUnitContainer}.
 */
export interface QueryUnitContainerData<SELECT extends FinishClause, ASK extends FinishClause> extends ContainerData<QueryToken> {
	/**
	 * @see QueryUnitContainer.selectFinishClauseFactory
	 */
	selectFinishClauseFactory:Factory<Container<any>, SELECT>;

	/**
	 * @see QueryUnitContainer.askFinishClauseFactory
	 */
	askFinishClauseFactory:Factory<Container<any>, ASK>;
}


/**
 * Immutable class that contains the hidden data of the main query
 * statement.
 *
 * Extension of the {@link Container} that add the finish factories
 * for every type of type of query supported.
 */
export class QueryUnitContainer<SELECT extends FinishClause, ASK extends FinishClause>
	extends Container<QueryToken>
	implements QueryUnitContainerData<SELECT, ASK> {

	/**
	 * The factory used for create the finish statement of a SELECT
	 * query.
	 */
	readonly selectFinishClauseFactory:Factory<Container<QueryToken<SelectToken>>, SELECT>;

	/**
	 * The factory used for create the finish statement of a SELECT
	 * query.
	 */
	readonly askFinishClauseFactory:Factory<Container<QueryToken<AskToken>>, ASK>;

	/**
	 * Constructor that receives and object with the base data of the
	 * container.
	 *
	 * @param data The base data for the container creation.
	 */
	constructor( data:QueryUnitContainerData<SELECT, ASK> ) {
		super( data );
		this.selectFinishClauseFactory = data.selectFinishClauseFactory;
		this.askFinishClauseFactory = data.askFinishClauseFactory;

		if( new.target === QueryUnitContainer ) Object.freeze( this );
	}
}

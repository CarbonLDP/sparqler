import { FinishClause } from "./clauses/FinishClause";
import { QueryClause } from "./clauses/QueryClause";

import { Container } from "./data/Container";
import { Factory } from "./data/Factory";
import { IRIResolver2 } from "./data/IRIResolver2";
import { QueryUnitContainer } from "./data/QueryUnitContainer";

import { QueryToken } from "./tokens/QueryToken";


/**
 * Alias for the finish factory function for the specified finish clause.
 *
 * The factory will receive the {@link Container} with the final token
 * data ({@link QueryToken}) of the constructed query.
 *
 * The factory function must return the extended {@link FinishClause}.
 * The build it factory {@link FinishClause.createFrom} is recommended
 * to be used internally so the expected behaviour applies with added
 * custom functionality for the custom factory.
 */
export type FinishFactory<T extends FinishClause> = Factory<Container<QueryToken>, T>;



/**
 * Interface with the same name fo the SPARQLER class, that helps
 * in the definition of the methods decorated by {@link QueryClause.createFrom}
 */
export interface SPARQLER<SELECT extends FinishClause = FinishClause> extends QueryClause<SELECT> {
}

/**
 * Class that allows to create the SPARQL query builder.
 *
 * See {@link QueryClause} for know the methods available for
 * construct the queries.
 */
export class SPARQLER<SELECT extends FinishClause = FinishClause> implements SPARQLER<SELECT> {

	/**
	 * Constructor that allows to create query builder with custom finish
	 * methods specified by the factories provided if specified.
	 *
	 * If no custom factory specified {@link FinishClause.createFrom}
	 * will be used instead.
	 *
	 * @param finishSelectFactory Factory for finishing a SELECT query.
	 */
	constructor(
		finishSelectFactory:FinishFactory<SELECT> = FinishClause.createFrom as FinishFactory<SELECT>
	) {

		const container:QueryUnitContainer<SELECT> = new QueryUnitContainer( {
			iriResolver: new IRIResolver2(),
			targetToken: new QueryToken( void 0 ),
			selectFinishClauseFactory: finishSelectFactory,
		} );

		return QueryClause.createFrom( container, this );
	}

}

export default SPARQLER;

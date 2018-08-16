import { FinishClause } from "./clauses/FinishClause";
import { QueryClause } from "./clauses/QueryClause";

import { IRIResolver } from "./data/IRIResolver";
import { QueryUnitContainer } from "./data/QueryUnitContainer";

import { FinishFactory } from "./FinishFactory";

import { QueryToken } from "./tokens/QueryToken";


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
			iriResolver: new IRIResolver(),
			targetToken: new QueryToken( void 0 ),
			selectFinishClauseFactory: finishSelectFactory,
		} );

		return QueryClause.createFrom( container, this );
	}

}
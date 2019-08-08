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
export interface SPARQLER<SELECT extends FinishClause = FinishClause, ASK extends FinishClause = FinishClause> extends QueryClause<SELECT, ASK> {
}

/**
 * Class that allows to create the SPARQL query builder.
 *
 * See {@link QueryClause} for know the methods available for
 * construct the queries.
 */
export class SPARQLER<SELECT extends FinishClause = FinishClause, ASK extends FinishClause = FinishClause> implements SPARQLER<SELECT, ASK> {

	/**
	 * Constructor that allows to create query builder with custom finish
	 * methods specified by the factories provided if specified.
	 *
	 * If no custom factory specified {@link FinishClause#createFrom `FinishClause.createFrom`}
	 * will be used instead.
	 *
	 * @param finishSelectFactory Factory for finishing a SELECT query.
	 * @param finishAskFactory Factory for finishing an ASK query.
	 */
     // TODO: Fix link syntax
     // TODO: Interface not showing up in Dgeni
	constructor(
		finishSelectFactory:FinishFactory<SELECT> = FinishClause.createFrom as FinishFactory<SELECT>,
		finishAskFactory:FinishFactory<ASK> = FinishClause.createFrom as FinishFactory<ASK>,
	) {

		const container:QueryUnitContainer<SELECT, ASK> = new QueryUnitContainer( {
			iriResolver: new IRIResolver(),
			targetToken: new QueryToken( void 0 ),
			selectFinishClauseFactory: finishSelectFactory,
			askFinishClauseFactory: finishAskFactory,
		} );

		return QueryClause.createFrom( container, this );
	}

}

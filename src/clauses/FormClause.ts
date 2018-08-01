import { IRIResolver2 } from "../iri/IRIResolver2";

import { FromToken } from "../tokens/FromToken";
import { QueryClauseToken } from "../tokens/QueryClauseToken";
import { QueryToken } from "../tokens/QueryToken";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { cloneElement } from "./utils";
import { WhereClause } from "./WhereClause";


export interface FromClause<T extends FinishClause> extends WhereClause<T> {
	/**
	 * Set a default graph to be included as the RDF Dataset where to
	 * look for the query solutions.
	 *
	 * @param iri IRI of the default graph to be included.
	 * @returns Object with the methods to keep constructing to query.
	 */
	from( iri:string ):FromClause<T>;

	/**
	 * Set a named graph to be included as the RDF Dataset where to look for
	 * the query solutions.
	 *
	 * @param iri IRI of the named graph to be included.
	 * @returns Object with the methods to keep constructing the query.
	 */
	fromNamed( iri:string ):FromClause<T>;
}


/**
 * Function that creates a generic {@link FromClause.from} function.
 * This function is used to create all the methods for the {@link FromClause}
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link FromClause} receives.
 * @param container The container that is bound to the FromClause methods.
 * @param named Optional boolean that indicates if the dataset graph is named or not.
 *
 * @returns The generic "from" function that shares the {@link FromClause.from} signature.
 * It behaviour depends if the {@param named} was set or not.
 *
 * @private
 */
function getFromFn<C extends Container2<QueryToken>, T extends FinishClause>( genericFactory:ClauseFactory<C, T>, container:C, named?:boolean ):FromClause<T>[ "from" ] {
	return ( iri:string ) => {
		const iriResolver:IRIResolver2 = new IRIResolver2( container.iriResolver );

		let query:QueryClauseToken = container.targetToken.queryClause;
		if( query.token !== "select" ) throw new Error( "Does not exists a SELECT token to add the FROM data." );

		query = cloneElement( query, {
			dataset: new FromToken( iriResolver.resolve( iri ), named )
		} );

		const queryToken:QueryToken = cloneElement( container.targetToken, { queryClause: query } );
		const newContainer = cloneElement( container, {
			iriResolver,
			targetToken: queryToken,
		} as Partial<C> );

		return FromClause.create( genericFactory, newContainer, {} );
	}
}


/**
 * @todo
 */
export const FromClause = {
	create<C extends Container2<QueryToken>, T extends FinishClause, O extends object>( genericFactory:ClauseFactory<typeof container, T>, container:C, object:O ):O & FromClause<T> {
		return WhereClause.create( genericFactory, container, Object.assign( object, {
			from: getFromFn( genericFactory, container ),
			fromNamed: getFromFn( genericFactory, container, true ),
		} ) );
	},
};
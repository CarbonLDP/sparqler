import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver } from "../data/IRIResolver";
import { cloneElement } from "../data/utils";

import { FromToken } from "../tokens/FromToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
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
function getFromFn<C extends Container<QueryToken<SelectToken>>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C, named?:boolean ):FromClause<T>[ "from" ] {
	return ( iri:string ) => {
		const iriResolver:IRIResolver = new IRIResolver( container.iriResolver );

		const queryClause = cloneElement( container.targetToken.queryClause, {
			dataset: new FromToken( iriResolver.resolve( iri ), named )
		} );

		const queryToken:QueryToken = cloneElement( container.targetToken, { queryClause } );
		const newContainer = cloneElement( container, {
			iriResolver,
			targetToken: queryToken,
		} as Partial<C> );

		return FromClause.createFrom( genericFactory, newContainer, {} );
	}
}


/**
 * @todo
 */
export const FromClause = {
	createFrom<C extends Container<QueryToken<SelectToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & FromClause<T> {
		return WhereClause.createFrom( genericFactory, container, Object.assign( object, {
			from: getFromFn( genericFactory, container ),
			fromNamed: getFromFn( genericFactory, container, true ),
		} ) );
	},
};
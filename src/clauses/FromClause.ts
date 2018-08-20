import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver } from "../data/IRIResolver";
import { cloneElement } from "../data/utils";
import { AskToken } from "../tokens/AskToken";

import { FromToken } from "../tokens/FromToken";
import { QueryToken } from "../tokens/QueryToken";
import { SelectToken } from "../tokens/SelectToken";

import { FinishClause } from "./FinishClause";
import { WhereClause } from "./WhereClause";


/**
 * Interface with the methods available to make a FROM statement.
 */
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
function getFromFn<C extends Container<QueryToken<SelectToken | AskToken>>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C, named?:boolean ):FromClause<T>[ "from" ] {
	return ( iri:string ) => {
		const iriResolver:IRIResolver = new IRIResolver( container.iriResolver );

		const datasets:FromToken[] = container.targetToken.queryClause.datasets
			.concat( new FromToken( iriResolver.resolve( iri ), named ) );
		const queryClause = cloneElement( container.targetToken.queryClause, { datasets } );

		const queryToken:QueryToken = cloneElement( container.targetToken, { queryClause } );
		const newContainer = cloneElement( container, {
			iriResolver,
			targetToken: queryToken,
		} as Partial<C> );

		return FromClause.createFrom( genericFactory, newContainer, {} );
	}
}


/**
 * Constant with the utils for {@link FromClause} objects.
 */
export const FromClause:{
	/**
	 * Factory function that allows to crete a {@link FromClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link FromClause} statement.
	 * @param container The related container with the data for the
	 * {@link FromClause} statement.
	 * @param object The base base from where to create the
	 * {@link FromClause} statement.
	 *
	 * @return The {@link FromClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken<SelectToken | AskToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & FromClause<T>;
} = {
	createFrom<C extends Container<QueryToken<SelectToken | AskToken>>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & FromClause<T> {
		return WhereClause.createFrom( genericFactory, container, Object.assign( object, {
			from: getFromFn( genericFactory, container ),
			fromNamed: getFromFn( genericFactory, container, true ),
		} ) );
	},
};
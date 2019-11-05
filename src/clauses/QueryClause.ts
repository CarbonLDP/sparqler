import { QueryUnitContainer } from "../core/containers/QueryUnitContainer";
import { cloneElement } from "../core/containers/utils";
import { Factory } from "../core/factories/Factory";
import { IRIResolver } from "../core/iri/IRIResolver";

import { BaseToken } from "../tokens/BaseToken";
import { IRIRefToken } from "../tokens/IRIRefToken";
import { PrefixToken } from "../tokens/PrefixToken";
import { QueryToken } from "../tokens/QueryToken";

import { AskClause } from "./AskClause";
import { FinishClause } from "./FinishClause";
import { SelectClause } from "./SelectClause";


/**
 * Interface that describes the base entry of any query statement.
 *
 * It allows to add the prologues `BASE` and `PREFIX`.
 * And also add support for specify a `vocab` used to resolve
 * relative properties/predicates.
 *
 * The current query types supported are:
 * - `SELECT`, specified by the extension of {@link SelectClause}
 * - `ASK`, specified by the extension of {@link AskClause}
 */
export interface QueryClause<SELECT extends FinishClause, ASK extends FinishClause> extends SelectClause<SELECT>, AskClause<ASK> {
	/**
	 * Add a base IRI the query uses to resolve any relative IRIs.
	 *
	 * If a default vocabulary is set with the {@link QueryClause#vocab `QueryClause.vocab`}
	 * method, the base is ignored for relative predicates.
	 *
	 * @param iri IRI to be used as the query BASE.
	 * @returns Object with the methods to keep constructing the query.
	 */
	// TODO: Fix link syntax
	base( iri:string ):QueryClause<SELECT, ASK>;

	/**
	 * Add a default vocabulary to be used to resolve relative IRIs when
	 * used as a predicate in a triple pattern.
	 *
	 * @param iri IRI to append to prepend to any relative predicate.
	 * @returns Object with the methods to keep constructing the query.
	 */
	vocab( iri:string ):QueryClause<SELECT, ASK>;

	/**
	 * Add a prefix to the query.
	 *
	 * If the prefix is not used in any part of the query it is not added
	 * in the compact query string.
	 *
	 * @param name Name the prefix will be identified for.
	 * @param iri The IRI of the current PREFIX.
	 * @returns Object with the methods to keep constructing the query.
	 */
	prefix( name:string, iri:string ):QueryClause<SELECT, ASK>;
}


/**
 * @see {@link QueryClause.base}
 */
function base<SELECT extends FinishClause, ASK extends FinishClause>( container:QueryUnitContainer<SELECT, ASK> ) {
	return ( iri:string ) => {
		const token:BaseToken = new BaseToken( new IRIRefToken( iri ) );

		const prologues:QueryToken[ "prologues" ] = container.targetToken
			.prologues.concat( token );

		const queryToken:QueryToken = cloneElement( container.targetToken, { prologues } );
		const newContainer:QueryUnitContainer<SELECT, ASK> = cloneElement( container, { targetToken: queryToken } );

		return QueryClause.createFrom<typeof container, SELECT, ASK, {}>( newContainer, {} );
	};
}

/**
 * @see {@link QueryClause.vocab}
 */
function vocab<SELECT extends FinishClause, ASK extends FinishClause>( container:QueryUnitContainer<SELECT, ASK> ) {
	return ( iri:string ) => {
		const iriResolver:IRIResolver = new IRIResolver( container.iriResolver, iri );
		const newContainer:QueryUnitContainer<SELECT, ASK> = cloneElement( container, { iriResolver } );

		return QueryClause.createFrom<typeof container, SELECT, ASK, {}>( newContainer, {} );
	}
}

/**
 * @see {@link QueryClause.prefix}
 */
function prefix<SELECT extends FinishClause, ASK extends FinishClause>( container:QueryUnitContainer<SELECT, ASK> ) {
	return ( name:string, iri:string ) => {
		const iriResolver:IRIResolver = new IRIResolver( container.iriResolver );
		const prologues = container.targetToken.prologues.slice();

		if( iriResolver.prefixes.has( name ) ) {
			const index:number = prologues
				.findIndex( token => token.token === "prefix" && token.namespace === name );

			if( index !== -1 )
				prologues.splice( index, 1 );
		}

		prologues.push( new PrefixToken( name, new IRIRefToken( iri ) ) );
		iriResolver.prefixes.set( name, false );

		const queryToken:QueryToken = cloneElement( container.targetToken, { prologues } );
		const newContainer:QueryUnitContainer<SELECT, ASK> = cloneElement( container, {
			iriResolver,
			targetToken: queryToken,
		} );

		return QueryClause.createFrom<typeof container, SELECT, ASK, {}>( newContainer, {} );
	}
}


/**
 * Constant with the utils functions for {@link QueryClause} objects.
 */
export const QueryClause:{
	/**
	 * Factory function that allows to crete a {@link QueryClause}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link QueryClause} statement.
	 * @param object The base base from where to create the
	 * {@link QueryClause} statement.
	 *
	 * @return The {@link QueryClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends QueryUnitContainer<SELECT, ASK>, SELECT extends FinishClause, ASK extends FinishClause, T extends object>( container:C, object:T ):T & QueryClause<SELECT, ASK>;
} = {
	createFrom<C extends QueryUnitContainer<SELECT, ASK>, SELECT extends FinishClause, ASK extends FinishClause, T extends object>( container:C, object:T ):T & QueryClause<SELECT, ASK> {
		const selectFactory:Factory<C, SelectClause<SELECT>> = SelectClause
			.createFrom.bind<null, any, any>( null, container.selectFinishClauseFactory );
		const askFactory:Factory<C, AskClause<ASK>> = AskClause
			.createFrom.bind<null, any, any>( null, container.askFinishClauseFactory );

		return Factory.createFrom(
			selectFactory,
			askFactory,
		)( container, Object.assign( object, {
			base: base( container ),
			vocab: vocab( container ),
			prefix: prefix( container ),
		} ) );
	},
};

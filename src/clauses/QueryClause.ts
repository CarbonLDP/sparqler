import { Factory } from "../data/Factory";
import { IRIResolver2 } from "../data/IRIResolver2";
import { QueryUnitContainer } from "../data/QueryUnitContainer";
import { cloneElement } from "../data/utils";

import { BaseToken } from "../tokens/BaseToken";
import { IRIToken } from "../tokens/IRIToken";
import { PrefixToken } from "../tokens/PrefixToken";
import { QueryToken } from "../tokens/QueryToken";

import { FinishClause } from "./FinishClause";
import { SelectClause } from "./SelectClause";


/**
 * @todo Document
 */
export interface QueryClause<T extends FinishClause> extends SelectClause<T> {
	/**
	 * Add a base IRI the query uses to resolve any relative IRIs.
	 *
	 * If a default vocabulary is set with the {@link QueryClause.vocab}
	 * method, the base is ignored for relative predicates.
	 *
	 * @param iri IRI to be used as the query BASE.
	 * @returns Object with the methods to keep constructing the query.
	 */
	base( iri:string ):QueryClause<T>;

	/**
	 * Add a default vocabulary to be used to resolve relative IRIs when
	 * used as a predicate in a triple pattern.
	 *
	 * @param iri IRI to append to prepend to any relative predicate.
	 * @returns Object with the methods to keep constructing the query.
	 */
	vocab( iri:string ):QueryClause<T>;

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
	prefix( name:string, iri:string ):QueryClause<T>;
}


/**
 * @see {@link QueryClause.base}
 */
function base<T extends FinishClause>( this:QueryUnitContainer<T>, iri:string ):QueryClause<T> {
	const token:BaseToken = new BaseToken( new IRIToken( iri ) );

	const prologues:QueryToken[ "prologues" ] = this.targetToken
		.prologues.concat( token );

	const queryToken:QueryToken = cloneElement( this.targetToken, { prologues } );
	const container:QueryUnitContainer<T> = cloneElement( this, { targetToken: queryToken } );

	return QueryClause.createFrom( container, {} );
}

/**
 * @see {@link QueryClause.vocab}
 */
function vocab<T extends FinishClause>( this:QueryUnitContainer<T>, iri:string ):QueryClause<T> {
	const iriResolver:IRIResolver2 = new IRIResolver2( this.iriResolver, iri );
	const container:QueryUnitContainer<T> = cloneElement( this, { iriResolver } );

	return QueryClause.createFrom( container, {} );
}

/**
 * @see {@link QueryClause.prefix}
 */
function prefix<T extends FinishClause>( this:QueryUnitContainer<T>, name:string, iri:string ):QueryClause<T> {
	const iriResolver:IRIResolver2 = new IRIResolver2( this.iriResolver );


	const prologues = this.targetToken.prologues.slice();

	if( iriResolver._prefixes.has( name ) ) {
		const index:number = prologues
			.findIndex( token => token.token === "prefix" && token.namespace === name );

		if( index !== - 1 )
			prologues.splice( index, 1 );
	}

	prologues.push( new PrefixToken( name, new IRIToken( iri ) ) );
	iriResolver._prefixes.set( name, false );


	const queryToken:QueryToken = cloneElement( this.targetToken, { prologues } );
	const container:QueryUnitContainer<T> = cloneElement( this, {
		iriResolver,
		targetToken: queryToken,
	} );

	return QueryClause.createFrom( container, {} );
}


/**
 * @todo Document
 */
export const QueryClause = {
	createFrom<C extends QueryUnitContainer<SELECT>, SELECT extends FinishClause, T extends object>( container:C, object:T ):T & QueryClause<SELECT> {
		const selectFactory:Factory<C, SelectClause<SELECT>> = SelectClause
			.createFrom.bind( null, container.selectFinishClauseFactory );

		return Factory.createFrom(
			selectFactory
		)( container, Object.assign( object, {
			base: base.bind( container ),
			vocab: vocab.bind( container ),
			prefix: prefix.bind( container ),
		} ) );
	},
};
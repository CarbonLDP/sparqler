import { Container } from "sparqler/clauses/Container";
import { selectDecorator } from "sparqler/clauses/decorators";
import {
	FinishClause,
	QueryClause,
} from "sparqler/clauses/interfaces";
import { genericDecorator } from "sparqler/clauses/utils";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import {
	BASE,
	CLOSE_IRI,
	OPEN_IRI,
	PREFIX,
	PREFIX_SYMBOL,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

/**
 * Add a base IRI the query uses to resolve any relative IRIs.
 *
 * If a default vocabulary is set with the {@link QueryClause.vocab}
 * method, the base is ignored for relative predicates.
 *
 * @param iri IRI to be used as the query BASE.
 * @returns Object with the methods to keep constructing the query.
 */
function base<T extends FinishClause>( this:Container<T>, iri:string ):QueryClause<T> {
	const tokens:Token[] = [ BASE, OPEN_IRI, new StringLiteral( iri ), CLOSE_IRI ];

	const container:Container<T> = new Container<T>( this, tokens );
	return queryDecorator<T, {}>( container, {} );
}

/**
 * Add a default vocabulary to be used to resolve relative IRIs when
 * used as a predicate in a triple pattern.
 *
 * @param iri IRI to append to prepend to any relative predicate.
 * @returns Object with the methods to keep constructing the query.
 */
function vocab<T extends FinishClause>( this:Container<T>, iri:string ):QueryClause<T> {
	const iriResolver:IRIResolver = new IRIResolver( this._iriResolver, iri );

	const container:Container<T> = new Container<T>( this, null, iriResolver );
	return queryDecorator<T, {}>( container, {} );
}

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
function prefix<T extends FinishClause>( this:Container<T>, name:string, iri:string ):QueryClause<T> {
	const iriResolver:IRIResolver = new IRIResolver( this._iriResolver );

	const previousIndex = iriResolver._prefixes.has( name ) ?
		this._tokens.findIndex( token => token instanceof StringLiteral && token[ "value" ] === name ) :
		- 1;

	iriResolver._prefixes.set( name, false );

	const tokens:Token[] = [ PREFIX, new StringLiteral( name ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( iri ), CLOSE_IRI ];

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );

	if( previousIndex !== - 1 ) {
		container._tokens.splice( previousIndex - 1, 6 );
	}

	return queryDecorator<T, {}>( container, {} );
}

/**
 * Decorator that bind {@link QueryClause} methods to container and
 * adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function queryDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & QueryClause<T> {
	return genericDecorator( { base, vocab, prefix }, container, selectDecorator<T, W>( container, object ) );
}

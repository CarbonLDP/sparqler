import {
	Container,
	FinishClause,
	genericDecorator,
	QueryClause,
	Resolver,
} from "sparqler/clauses";
import { selectDecorator } from "sparqler/clauses/decorators";
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

function base<T extends FinishClause>( this:Container<T>, iri:string ):QueryClause<T> {
	const tokens:Token[] = [ BASE, OPEN_IRI, new StringLiteral( iri ), CLOSE_IRI ];

	const container:Container<T> = new Container<T>( this, tokens );
	return queryDecorator<T, {}>( container, {} );
}

function vocab<T extends FinishClause>( this:Container<T>, iri:string ):QueryClause<T> {
	const iriResolver:Resolver = new Resolver( this._iriResolver, iri );

	const container:Container<T> = new Container<T>( this, null, iriResolver );
	return queryDecorator<T, {}>( container, {} );
}

function prefix<T extends FinishClause>( this:Container<T>, name:string, iri:string ):QueryClause<T> {
	const iriResolver:Resolver = new Resolver( this._iriResolver );
	iriResolver._prefixes.set( name, false );

	const tokens:Token[] = [ PREFIX, new StringLiteral( name ), PREFIX_SYMBOL, OPEN_IRI, new StringLiteral( iri ), CLOSE_IRI ];

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );
	return queryDecorator<T, {}>( container, {} );
}

export function queryDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & QueryClause<T> {
	return genericDecorator( { base, vocab, prefix }, container, selectDecorator<T, W>( container, object ) );
}

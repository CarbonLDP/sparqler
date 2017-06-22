import {
	Container,
	genericDecorator,
} from "sparqler/clauses/data-container";
import { whereDecorator } from "sparqler/clauses/builders/where";
import {
	FinishClause,
	FromClause,
	WhereClause,
} from "sparqler/clauses/interfaces";
import {
	FROM,
	NAMED,
} from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens/Token";


function _from<T extends FinishClause>( base:Container<T>, tokens:Token[], iri:string ):WhereClause<T> {
	tokens.push( ...base._iriResolver._resolveIRI( iri ) );

	const container:Container<T> = new Container<T>( base, tokens );
	return whereDecorator<T, {}>( container, {} );
}

function from<T extends FinishClause>( this:Container<T>, iri:string ):WhereClause<T> {
	return _from<T>( this, [ FROM ], iri );
}

function fromNamed<T extends FinishClause>( this:Container<T>, iri:string ):WhereClause<T> {
	return _from<T>( this, [ FROM, NAMED ], iri );
}

export function fromDecorator<T extends FinishClause, W extends object>( base:Container<T>, object:W ):W & FromClause<T> {
	return genericDecorator( { from, fromNamed }, base, whereDecorator<T, W>( base, object ) );
}

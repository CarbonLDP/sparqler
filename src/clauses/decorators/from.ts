import {
	Container,
	FinishClause,
	FromClause,
	genericDecorator,
	WhereClause,
} from "sparqler/clauses";
import { whereDecorator } from "sparqler/clauses/decorators";
import {
	FROM,
	NAMED,
} from "sparqler/patterns/tokens";
import { Token } from "sparqler/tokens";


function _from<T extends FinishClause>( self:Container<T>, tokens:Token[], iri:string ):WhereClause<T> {
	tokens.push( ...self._iriResolver.resolve( iri ) );

	const container:Container<T> = new Container<T>( self, tokens );
	return whereDecorator<T, {}>( container, {} );
}

function from<T extends FinishClause>( this:Container<T>, iri:string ):WhereClause<T> {
	return _from<T>( this, [ FROM ], iri );
}

function fromNamed<T extends FinishClause>( this:Container<T>, iri:string ):WhereClause<T> {
	return _from<T>( this, [ FROM, NAMED ], iri );
}

export function fromDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & FromClause<T> {
	return genericDecorator( { from, fromNamed }, container, whereDecorator<T, W>( container, object ) );
}
import {
	Container,
	genericDecorator,
} from "sparqler/clauses/Container";
import {
	FinishClause,
	LimitClause,
	LimitOffsetClause,
	OffsetClause,
} from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns";
import {
	LIMIT,
	OFFSET,
} from "sparqler/patterns/tokens";
import {
	NumberLiteral,
	Token,
} from "sparqler/tokens";


// Containers

export class LimitContainer<T extends FinishClause | GraphPattern> extends Container<T> {
	readonly _offsetUsed:boolean;

	constructor( previousContainer:Container<any>, newTokens:Token[], offsetUsed:boolean ) {
		super( previousContainer, newTokens );
		this._offsetUsed = offsetUsed;

		Object.freeze( this );
	}
}

export class OffsetContainer<T extends FinishClause | GraphPattern> extends Container<T> {
	readonly _limitUsed:boolean;

	constructor( previousContainer:Container<any>, newTokens:Token[], limitUsed:boolean ) {
		super( previousContainer, newTokens );
		this._limitUsed = limitUsed;

		Object.freeze( this );
	}
}

// Functionality

export function limit<T extends FinishClause | GraphPattern>( this:LimitContainer<T>, limit:number ):T | OffsetClause<T> & T {
	const tokens:Token[] = [ LIMIT, new NumberLiteral( limit ) ];

	// Return T
	if( this._offsetUsed ) {
		const container:Container<T> = new Container<T>( this, tokens );
		return this._finishDecorator<{}>( container, {} );
	}

	// Return OffsetClause<T> & T
	const container:OffsetContainer<T> = new OffsetContainer<T>( this, tokens, true );
	return this._finishDecorator<OffsetClause<T>>( container, offsetBuilderDecorator<T, {}>( container, {} ) );
}

export function offset<T extends FinishClause | GraphPattern>( this:OffsetContainer<T>, offset:number ):T | OffsetClause<T> & T {
	const tokens:Token[] = [ OFFSET, new NumberLiteral( offset ) ];

	// Return T
	if( this._limitUsed ) {
		const container:Container<T> = new Container<T>( this, tokens );
		return this._finishDecorator<{}>( container, {} );
	}

	// Return LimitClause<T> & T
	const container:LimitContainer<T> = new LimitContainer<T>( this, tokens, true );
	return this._finishDecorator<LimitClause<T>>( container, limitBuilderDecorator<T, {}>( container, {} ) );
}


// Decorators

export function limitBuilderDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & LimitClause<T> {
	return genericDecorator( { limit }, container, object );
}

export function offsetBuilderDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & OffsetClause<T> {
	return genericDecorator( { offset }, container, object );
}

export function limitOffsetDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & LimitOffsetClause<T> {
	return genericDecorator( {
		limit: limit as ( limit:number ) => OffsetClause<T> & T,
		offset: offset as ( offset:number ) => LimitClause<T> & T,
	}, container, object );
}

import { Container } from "sparqler/clauses/Container";
import {
	FinishClause,
	LimitClause,
	LimitOffsetClause,
	OffsetClause,
} from "sparqler/clauses/interfaces";
import { genericDecorator } from "sparqler/clauses/utils";
import { GraphPattern } from "sparqler/patterns/interfaces";
import {
	LIMIT,
	OFFSET,
} from "sparqler/patterns/tokens";
import {
	NumberLiteral,
	Token,
} from "sparqler/tokens";


/**
 * Enum to specify which method is creating the LimitOffsetContainer.
 */
export enum CurrentMethod {
	LIMIT,
	OFFSET,
}

/**
 * Container to be used by the limit and offset methods to keep track of which method is called first.
 */
export class LimitOffsetContainer<T extends FinishClause | GraphPattern = FinishClause> extends Container<T> {

	/**
	 * Property indicating that limit method has been used first.
	 */
	readonly _limitUsed:boolean;

	/**
	 * Property indicating that offset method has been used first.
	 */
	readonly _offsetUsed:boolean;

	/**
	 * Creates the container specifying the method that it's creating it.
	 *
	 * @param previousContainer The previous container data to be copied.
	 * @param newTokens The new tokens to be added.
	 * @param currentMethod The method that is creating the current container.
	 */
	constructor( previousContainer:Container<any>, newTokens:Token[], currentMethod:CurrentMethod ) {
		super( previousContainer, newTokens );
		this._offsetUsed = currentMethod === CurrentMethod.OFFSET;
		this._limitUsed = currentMethod === CurrentMethod.LIMIT;

		Object.freeze( this );
	}
}

/**
 * Set the limit of results the query should return.
 *
 * @param limit The number to be applied as limit.
 * @returns A OffsetClause or the FinishClause/GraphPattern depending
 * if the offset method has been called before or not.
 */
export function limit<T extends FinishClause | GraphPattern>( this:LimitOffsetContainer<T>, limit:number ):T | OffsetClause<T> & T {
	const tokens:Token[] = [ LIMIT, new NumberLiteral( limit ) ];

	// Return T
	if( this._offsetUsed ) {
		const container:Container<T> = new Container<T>( this, tokens );
		return this._finishDecorator<{}>( container, {} );
	}

	// Return OffsetClause<T> & T
	const container:LimitOffsetContainer<T> = new LimitOffsetContainer<T>( this, tokens, CurrentMethod.LIMIT );
	return this._finishDecorator<OffsetClause<T>>( container, offsetDecorator<T, {}>( container, {} ) );
}

/**
 * Set the offset of results the query should return from.
 *
 * @param offset The number to be applied as offset.
 * @returns A LimitClause or the FinishClause/GraphPattern depending
 * if the limit method has been called before or not.
 */
export function offset<T extends FinishClause | GraphPattern>( this:LimitOffsetContainer<T>, offset:number ):T | LimitClause<T> & T {
	const tokens:Token[] = [ OFFSET, new NumberLiteral( offset ) ];

	// Return T
	if( this._limitUsed ) {
		const container:Container<T> = new Container<T>( this, tokens );
		return this._finishDecorator<{}>( container, {} );
	}

	// Return LimitClause<T> & T
	const container:LimitOffsetContainer<T> = new LimitOffsetContainer<T>( this, tokens, CurrentMethod.OFFSET );
	return this._finishDecorator<LimitClause<T>>( container, limitDecorator<T, {}>( container, {} ) );
}


/**
 * Decorator that binds the LimitClause methods to a container and adds them
 * to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function limitDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & LimitClause<T> {
	return genericDecorator( { limit }, container, object );
}

/**
 * Decorator that binds the OffsetClause methods to a container and adds them
 * to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function offsetDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & OffsetClause<T> {
	return genericDecorator( { offset }, container, object );
}

/**
 * Decorator that binds the LimitOffsetClause methods to a container and adds
 * them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function limitOffsetDecorator<T extends FinishClause | GraphPattern, W extends object>( container:Container<T>, object:W ):W & LimitOffsetClause<T> {
	return genericDecorator( {
		limit: limit as ( limit:number ) => OffsetClause<T> & T,
		offset: offset as ( offset:number ) => LimitClause<T> & T,
	}, container, object );
}

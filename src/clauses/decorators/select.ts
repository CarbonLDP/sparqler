import { Container, } from "sparqler/clauses/Container";
import {
	fromDecorator,
	subFinishDecorator,
	subWhereDecorator,
} from "sparqler/clauses/decorators";
import {
	FinishClause,
	FromClause,
	SelectClause,
	SubFinishClause,
	SubSelectClause,
	SubWhereClause,
} from "sparqler/clauses/interfaces";
import {
	ALL,
	DISTINCT,
	REDUCED,
	SELECT,
	VAR_SYMBOL,
} from "sparqler/patterns/tokens";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";

/**
 * Internal function that actually creates the tokens of the
 * SelectClause and SubSelectClause methods.
 *
 * @param self The container that is bound to the FromClause methods.
 * @param tokens Initial tokens depending which method the function
 * is called from.
 * @param variables Optional variables to be converted in tokens.
 * @returns Object with the methods to keep constructing the query.
 * Depending of the self container it will return a `FromClause`, as
 * `SelectClause` indicates; or a `WhereClause<SubFinishClause>`, as
 * `SubSelectClause` also indicates.
 * @private
 */
function _select<T extends FinishClause>( self:Container<T | SubFinishClause>, tokens:Token[], variables?:string[] ):SubWhereClause | FromClause<T> {
	if( variables && variables.length === 0 ) throw new Error( "Need to provide al least one variable." );

	if( variables ) variables.forEach( variable => tokens.push( VAR_SYMBOL, new StringLiteral( variable ) ) );

	const container:Container<T | SubFinishClause> = new Container<T | SubFinishClause>( self, tokens );

	if( self._finishDecorator === subFinishDecorator )
		return subWhereDecorator<SubFinishClause, {}>( container as Container<SubFinishClause>, {} );
	return fromDecorator<T, {}>( container as Container<T>, {} );
}

/**
 * Set a list of variables to be retrieved by the query.
 *
 * @param variables The list of variables.
 * @returns Object with the methods to keep constructing the query.
 */
function select<T extends FinishClause>( this:Container<T>, ...variables:string[] ):FromClause<T> {
	return _select<T>( this, [ SELECT ], variables ) as FromClause<T>;
}

/**
 * Set a list of variables to be retrieved by the query ensuring no
 * repetitions in the set of solutions.
 *
 * @param variables The list of variables.
 * @returns Object with the methods to keep constructing the query.
 */
function selectDistinct<T extends FinishClause>( this:Container<T>, ...variables:string[] ):FromClause<T> {
	return _select<T>( this, [ SELECT, DISTINCT ], variables ) as FromClause<T>;
}

/**
 * Set a list of variables to be retrieved by the query permitting
 * eliminations of non-distinct solutions, but not ensuring a set of
 * unique ones.
 *
 * @param variables The list of variables.
 * @returns Object with the methods to keep constructing the query.
 */
function selectReduced<T extends FinishClause>( this:Container<T>, ...variables:string[] ):FromClause<T> {
	return _select<T>( this, [ SELECT, REDUCED ], variables ) as FromClause<T>;
}

/**
 * Set that the query must return all the solutions for the variables
 * used in the where pattern matching.
 *
 * @returns Object with the methods to keep constructing the query.
 */
function selectAll<T extends FinishClause>( this:Container<T> ):FromClause<T> {
	return _select<T>( this, [ SELECT, ALL ] ) as FromClause<T>;
}

/**
 * Set that the query must return all the solutions for the variables
 * used in the where pattern matching, ensuring there is not
 * duplicated solutions.
 *
 * @returns Object with the methods to keep constructing the query.
 */
function selectAllDistinct<T extends FinishClause>( this:Container<T> ):FromClause<T> {
	return _select<T>( this, [ SELECT, DISTINCT, ALL ] ) as FromClause<T>;
}

/**
 * Set that the query must return all the solutions for the variables
 * used in the where pattern matching, permitting eliminations of
 * non-distinct solutions, but not ensuring a set of unique ones.
 *
 * @returns Object with the methods to keep constructing the query.
 */
function selectAllReduced<T extends FinishClause>( this:Container<T> ):FromClause<T> {
	return _select<T>( this, [ SELECT, REDUCED, ALL ] ) as FromClause<T>;
}

/**
 * Decorator that binds the {@link SelectClause} methods to a
 * container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function selectDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & SelectClause<T>;
/**
 * Decorator that binds the {@link SubSelectClause} methods to a subSelect
 * container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function selectDecorator<W extends object>( container:Container<SubFinishClause>, object:W ):W & SubSelectClause;
export function selectDecorator<T extends FinishClause, W extends object>( container:Container<T | SubFinishClause>, object:W ):W & (SelectClause<T> | SubSelectClause) {
	return Object.assign( object, {
		select: select.bind( container ),
		selectDistinct: selectDistinct.bind( container ),
		selectReduced: selectReduced.bind( container ),
		selectAll: selectAll.bind( container ),
		selectAllDistinct: selectAllDistinct.bind( container ),
		selectAllReduced: selectAllReduced.bind( container ),
	} );
}

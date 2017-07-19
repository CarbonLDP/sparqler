import {
	Container,
	FinishDecorator,
} from "sparqler/clauses/Container";
import {
	fromDecorator,
	graphPatternDecorator,
	whereDecorator,
} from "sparqler/clauses/decorators";
import {
	FinishClause,
	FromClause,
	SelectClause,
	SubSelect,
	WhereClause,
} from "sparqler/clauses/interfaces";
import { genericDecorator } from "sparqler/clauses/utils";
import { IRIResolver } from "sparqler/iri";
import { GraphPattern } from "sparqler/patterns";
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
 * Container to be used by the subSelect pattern where it extends
 * the {@link Container} class specifying the finish decorator as
 * {@link graphPatternDecorator}.
 */
export class SubSelectContainer extends Container<GraphPattern> {

	readonly _finishDecorator:FinishDecorator<GraphPattern>;

	constructor( iriResolver:IRIResolver ) {
		super( null, null, iriResolver );
		this._finishDecorator = graphPatternDecorator;

		Object.freeze( this );
	}
}

/**
 * Internal function that actually creates the tokens of the
 * SelectClause and SubSelect methods.
 *
 * @param self The container that is bound to the FromClause methods.
 * @param tokens Initial tokens depending which method the function
 * is called from.
 * @param variables Optional variables to be converted in tokens.
 * @returns Object with the methods to keep constructing the query.
 * Depending of the self container it will return a `FromClause`, as
 * `SelectClause` indicates; or a `WhereClause<GraphPattern>`, as
 * `SubSelect` also indicates.
 * @private
 */
function _select<T extends FinishClause>( self:Container<T | GraphPattern> | SubSelectContainer, tokens:Token[], variables?:string[] ):WhereClause<GraphPattern> | FromClause<T> {
	if( variables && variables.length === 0 ) throw new Error( "Need to provide al least one variable." );

	if( variables ) variables.forEach( variable => tokens.push( VAR_SYMBOL, new StringLiteral( variable ) ) );

	const container:Container<T | GraphPattern> = new Container<T | GraphPattern>( self, tokens );

	if( self._finishDecorator === graphPatternDecorator )
		return whereDecorator<GraphPattern, {}>( container as Container<GraphPattern>, {} );
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
 * Decorator that binds the {@link SubSelect} methods to a subSelect
 * container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function selectDecorator<W extends object>( container:SubSelectContainer, object:W ):W & SubSelect;
export function selectDecorator<T extends FinishClause, W extends object>( container:Container<T> | SubSelectContainer, object:W ):W & (SelectClause<T> | SubSelect) {
	return genericDecorator( {
		select,
		selectDistinct,
		selectReduced,
		selectAll,
		selectAllDistinct,
		selectAllReduced,
	}, container, object );
}

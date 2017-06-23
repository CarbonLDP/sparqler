import {
	Container,
	FinishClause,
	FromClause,
	genericDecorator,
	SelectClause,
	SubSelect,
	WhereClause,
} from "sparqler/clauses";
import {
	fromDecorator,
	graphPatternDecorator,
	whereDecorator,
} from "sparqler/clauses/decorators";
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

class SubSelectContainer extends Container<GraphPattern> {

	readonly _finishDecorator:<W extends object>( base:Container<GraphPattern>, object:W ) => W & GraphPattern;

	constructor( base:Container<GraphPattern>, tokens:Token[] ) {
		super( base, tokens );
		this._finishDecorator = graphPatternDecorator;

		Object.freeze( this );
	}
}

function _select<T extends FinishClause>( base:Container<T | GraphPattern> | SubSelectContainer, tokens:Token[], variables?:string[] ):WhereClause<GraphPattern> | FromClause<T> {
	if( variables && variables.length === 0 ) throw new Error( "IllegalArgumentError: Need to provide al least one variable." );

	if( variables ) variables.forEach( variable => tokens.push( VAR_SYMBOL, new StringLiteral( variable ) ) );

	const container:Container<T> = new Container<T>( base, tokens );

	if( base._finishDecorator === graphPatternDecorator )
		return whereDecorator<GraphPattern, {}>( container, {} );
	return fromDecorator<T, {}>( container, {} );
}

function select<T extends FinishClause>( this:Container<T>, ...variables:string[] ):FromClause<T> {
	return _select<T>( this, [ SELECT ], variables ) as FromClause<T>;
}
function selectDistinct<T extends FinishClause>( this:Container<T>, ...variables:string[] ):FromClause<T> {
	return _select<T>( this, [ SELECT, DISTINCT ], variables ) as FromClause<T>;
}
function selectReduced<T extends FinishClause>( this:Container<T>, ...variables:string[] ):FromClause<T> {
	return _select<T>( this, [ SELECT, REDUCED ], variables ) as FromClause<T>;
}
function selectAll<T extends FinishClause>( this:Container<T> ):FromClause<T> {
	return _select<T>( this, [ SELECT, ALL ] ) as FromClause<T>;
}
function selectAllDistinct<T extends FinishClause>( this:Container<T> ):FromClause<T> {
	return _select<T>( this, [ SELECT, DISTINCT, ALL ] ) as FromClause<T>;
}
function selectAllReduced<T extends FinishClause>( this:Container<T> ):FromClause<T> {
	return _select<T>( this, [ SELECT, REDUCED, ALL ] ) as FromClause<T>;
}

export function selectDecorator<T extends FinishClause, W extends object>( base:Container<T>, object:W ):W & SelectClause<T> {
	return genericDecorator( {
		select,
		selectDistinct,
		selectReduced,
		selectAll,
		selectAllDistinct,
		selectAllReduced,
	}, base, fromDecorator<T, W>( base, object ) );
}

export function subSelectDecorator<W extends object>( base:SubSelectContainer, object:W ):W & SubSelect {
	return genericDecorator( {
		select,
		selectDistinct,
		selectReduced,
		selectAll,
		selectAllDistinct,
		selectAllReduced,
	}, base, whereDecorator<GraphPattern, W>( base, object ) );
}

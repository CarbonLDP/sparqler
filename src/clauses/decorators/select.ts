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

export class SubSelectContainer extends Container<GraphPattern> {

	readonly _finishDecorator:FinishDecorator<GraphPattern>;

	constructor( iriResolver:IRIResolver ) {
		super( null, null, iriResolver );
		this._finishDecorator = graphPatternDecorator;

		Object.freeze( this );
	}
}

function _select<T extends FinishClause>( self:Container<T | GraphPattern> | SubSelectContainer, tokens:Token[], variables?:string[] ):WhereClause<GraphPattern> | FromClause<T> {
	if( variables && variables.length === 0 ) throw new Error( "Need to provide al least one variable." );

	if( variables ) variables.forEach( variable => tokens.push( VAR_SYMBOL, new StringLiteral( variable ) ) );

	const container:Container<T | GraphPattern> = new Container<T | GraphPattern>( self, tokens );

	if( self._finishDecorator === graphPatternDecorator )
		return whereDecorator<GraphPattern, {}>( container as Container<GraphPattern>, {} );
	return fromDecorator<T, {}>( container as Container<T>, {} );
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

export function selectDecorator<W extends object>( container:SubSelectContainer, object:W ):W & SubSelect;
export function selectDecorator<T extends FinishClause, W extends object>( container:Container<T>, object:W ):W & SelectClause<T>;
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

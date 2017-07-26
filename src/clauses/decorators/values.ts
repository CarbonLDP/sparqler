import {
	genericDecorator,
	ValuesClause,
} from "sparqler/clauses";
import { Container } from "sparqler/clauses/Container";
import {
	FinishClause,
	SubFinishClause,
} from "sparqler/clauses/interfaces";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import {
	PatternBuilder,
	SupportedNativeTypes,
	Undefined,
} from "sparqler/patterns";
import {
	CLOSE_MULTI_BLOCK,
	CLOSE_SINGLE_BLOCK,
	CLOSE_SINGLE_LIST,
	OPEN_MULTI_BLOCK,
	OPEN_SINGLE_BLOCK,
	OPEN_SINGLE_LIST,
	VALUES,
	VAR_SYMBOL,
} from "sparqler/patterns/tokens";
import {
	Literal,
	Resource,
} from "sparqler/patterns/triples";
import {
	StringLiteral,
	Token,
} from "sparqler/tokens";
import { serialize } from "sparqler/utils/ObjectPattern";

type PossibleTypes = SupportedNativeTypes | Resource | Literal | Undefined;

/**
 * Set the values of a variable to be combined into the results query.
 *
 * @param variable Variable to add values.
 * @param values The values to be combined.
 * @returns Object with the methods to keep constructing the query.
 */
function values<T extends FinishClause | SubFinishClause>( this:Container<T>, variable:string, values:SupportedNativeTypes | SupportedNativeTypes[] ):T;
/**
 * Set the values of a variable to be combined into the results query.
 *
 * The values are constructed with a function that receives a
 * pattern builder.
 *
 * @param variable Variable to add values.
 * @param valuesBuilder Functions that returns the values to be added.
 * @returns Object with the methods to keep constructing the query.
 */
function values<T extends FinishClause | SubFinishClause>( this:Container<T>, variable:string, valuesBuilder:( builder:PatternBuilder ) => ( SupportedNativeTypes | Resource | Literal | Undefined ) | ( SupportedNativeTypes | Resource | Literal | Undefined )[] ):T;
/**
 * Set the values of multiple variables to be combined into the results
 * query.
 *
 * @param variables Variables to add values.
 * @param values The values to be combined.
 * @returns Object with the methods to keep constructing the query.
 */
function values<T extends FinishClause | SubFinishClause>( this:Container<T>, variables:string[], values:SupportedNativeTypes[] | SupportedNativeTypes[][] ):T;
/**
 * Set the values of multiple variables to be combined into the results
 * query.
 *
 * The values are constructed with a function that receives a
 * pattern builder.
 *
 * @param variables Variables to add values.
 * @param valuesBuilder Functions that returns the values to be added.
 * @returns Object with the methods to keep constructing the query.
 */
function values<T extends FinishClause | SubFinishClause>( this:Container<T>, variables:string[], valuesBuilder:( builder:PatternBuilder ) => ( SupportedNativeTypes | Resource | Literal | Undefined )[] | ( SupportedNativeTypes | Resource | Literal | Undefined )[][] ):T;
function values<T extends FinishClause | SubFinishClause>( this:Container<T>, variableOrVariables:string | string[], valuesOrBuilder ):T {
	const isSingle:boolean = ! Array.isArray( variableOrVariables );
	const variables:string[] = isSingle ? [ variableOrVariables as string ] : variableOrVariables as string[];
	const tokens:Token[] = [ VALUES ];

	if( isSingle ) {
		tokens.push( VAR_SYMBOL, new StringLiteral( variables[ 0 ] ), OPEN_SINGLE_BLOCK );
	} else {
		tokens.push( OPEN_SINGLE_LIST );
		variables.forEach( variable => tokens.push( VAR_SYMBOL, new StringLiteral( variable ) ) );
		tokens.push( CLOSE_SINGLE_LIST, OPEN_MULTI_BLOCK );
	}

	let iriResolver:IRIResolver = void 0;
	const rawValues:PossibleTypes | PossibleTypes[] | PossibleTypes[][] =
		typeof valuesOrBuilder === "function" ?
			valuesOrBuilder( new PatternBuilder( iriResolver = new IRIResolver( this._iriResolver ) ) ) :
			valuesOrBuilder;

	const values:PossibleTypes[][] = isSingle ?
		Array.isArray( rawValues ) ? (rawValues as PossibleTypes[]).map( value => [ value ] ) : [ [ rawValues ] ] :
		Array.isArray( rawValues[ 0 ] ) ? rawValues as PossibleTypes[][] : [ rawValues ] as PossibleTypes[][];

	values.forEach( ( valuesRow ) => {
		if( isSingle ) {
			tokens.push( ...serialize( valuesRow[ 0 ] ) );
		} else {
			tokens.push( OPEN_SINGLE_LIST );
			valuesRow.forEach( value => tokens.push( ...serialize( value ) ) );
			tokens.push( CLOSE_SINGLE_LIST );
		}
	} );

	tokens.push( isSingle ? CLOSE_SINGLE_BLOCK : CLOSE_MULTI_BLOCK );

	const container:Container<T> = new Container<T>( this, tokens, iriResolver );
	return this._finishDecorator( container, {} );
}

/**
 * Decorator that binds the {@link ValuesClause} methods to a
 * container and adds them to the provided object.
 *
 * @param container The container where to bind the respective methods.
 * @param object Object to be decorated with the bound methods.
 * @returns The same object provided that has been decorated.
 */
export function valuesDecorator<T extends FinishClause | SubFinishClause, W extends object>( container:Container<T>, object:W ):W & ValuesClause<T> {
	return genericDecorator( { values }, container, object );
}
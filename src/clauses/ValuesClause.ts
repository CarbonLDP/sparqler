import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { IRIResolver } from "../data/IRIResolver";
import { cloneElement } from "../data/utils";

import { PatternBuilder2 } from "../patterns/PatternBuilder2";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";
import { Literal } from "../patterns/triplePatterns/Literal";
import { Resource } from "../patterns/triplePatterns/Resource";
import { Undefined } from "../patterns/Undefined";
import { convertValue } from "../patterns/utils";

import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ValuesToken } from "../tokens/ValuesToken";
import { VariableToken } from "../tokens/VariableToken";

import { FinishClause } from "./FinishClause";


export interface ValuesClause<T extends FinishClause> {
	/**
	 * Set the values of a variable to be combined into the results query.
	 *
	 * @param variable Variable to add values.
	 * @param values The values to be combined.
	 * @returns Object with the methods to keep constructing the query.
	 */
	values( variable:string, values:SupportedNativeTypes | SupportedNativeTypes[] ):T;

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
	values( variable:string, valuesBuilder:( builder:PatternBuilder2 ) => (SupportedNativeTypes | Resource | Literal | Undefined) | (SupportedNativeTypes | Resource | Literal | Undefined)[] ):T;

	/**
	 * Set the values of multiple variables to be combined into the results
	 * query.
	 *
	 * @param variables Variables to add values.
	 * @param values The values to be combined.
	 * @returns Object with the methods to keep constructing the query.
	 */
	values( variables:string[], values:SupportedNativeTypes[] | SupportedNativeTypes[][] ):T;

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
	values( variables:string[], valuesBuilder:( builder:PatternBuilder2 ) => (SupportedNativeTypes | Resource | Literal | Undefined)[] | (SupportedNativeTypes | Resource | Literal | Undefined)[][] ):T;
}


type Values = SupportedNativeTypes | Resource | Literal | "UNDEF";

type ValuesOrBuilder =
	| (SupportedNativeTypes | SupportedNativeTypes[])
	| (SupportedNativeTypes[] | SupportedNativeTypes[][])
	| (( builder:PatternBuilder2 ) => Values | Values[])
	| (( builder:PatternBuilder2 ) => Values[] | Values[][])
	;

function _normalizeVariables( variableOrVariables:string | string [] ):VariableToken[] {
	const variables:string[] = Array.isArray( variableOrVariables ) ? variableOrVariables : [ variableOrVariables ];
	return variables.map( x => new VariableToken( x ) );
}

function _normalizeRawValues( valuesOrBuilder:ValuesOrBuilder, iriResolver:IRIResolver, isSingle:boolean ):Values[][] {
	let rawValues:Values | (Values | Values[])[] = typeof valuesOrBuilder === "function" ?
		valuesOrBuilder( PatternBuilder2.create( iriResolver ) ) :
		valuesOrBuilder;

	// When single variable
	if( ! Array.isArray( rawValues ) )
		return [ [ rawValues ] ];

	if( isSingle )
		rawValues.map( value => [ value ] );


	// When multiple variables
	if( rawValues.some( Array.isArray ) )
		return rawValues as Values[][];

	return [ rawValues as Values[] ];
}

/**
 * Function that creates the {@link ValuesClause.values} function.
 *
 * @param genericFactory The factory for the generic {@link FinishClause}
 * that the {@link ValuesClause} receives.
 * @param container The container with the query data of the statement.
 *
 * @returns The {@link ValuesClause.values} function.
 *
 * @private
 */
function createValuesFn<C extends Container<QueryToken | SubSelectToken>, T extends FinishClause>( genericFactory:Factory<C, T>, container:C ):ValuesClause<T>[ "values" ] {
	return ( variableOrVariables:string | string [], valuesOrBuilder:ValuesOrBuilder ) => {
		const token:ValuesToken = new ValuesToken();

		const variables:VariableToken[] = _normalizeVariables( variableOrVariables );
		token.addVariables( ...variables );

		const isSingle:boolean = ! Array.isArray( variableOrVariables );
		const iriResolver:IRIResolver = new IRIResolver( container.iriResolver );
		const values:Values[][] = _normalizeRawValues( valuesOrBuilder, iriResolver, isSingle );
		values.forEach( ( valuesRow ) => token.addValues( ...valuesRow.map( convertValue ) ) );

		const targetToken = cloneElement( container.targetToken, { values: token } );
		const newContainer = cloneElement( container, { iriResolver, targetToken } as Partial<C> );
		return genericFactory( newContainer, {} );
	}
}


/**
 * Constant with the utils for {@link ValuesClause} objects.
 */
export const ValuesClause:{
	/**
	 * Factory function that allows to crete a {@link ValuesClause}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory to create the generic finish
	 * of the {@link ValuesClause} statement.
	 * @param container The related container with the data for the
	 * {@link ValuesClause} statement.
	 * @param object The base base from where to create the
	 * {@link ValuesClause} statement.
	 *
	 * @return The {@link ValuesClause} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<QueryToken | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & ValuesClause<T>
} = {
	createFrom<C extends Container<QueryToken | SubSelectToken>, T extends FinishClause, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & ValuesClause<T> {
		return Object.assign( object, {
			values: createValuesFn( genericFactory, container ),
		} );
	},
};

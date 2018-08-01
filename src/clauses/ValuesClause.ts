import { FinishClause } from "sparqler/clauses/FinishClause";
import { PatternBuilder, SupportedNativeTypes, Undefined } from "sparqler/patterns";
import { Literal, Resource } from "sparqler/patterns/triples";
import { QueryToken, ValuesToken, VariableToken } from "sparqler/tokens";

import { IRIResolver2 } from "../iri/IRIResolver2";

import { SubSelectToken } from "../tokens/SubSelectToken";

import { convertValue } from "../utils/ObjectPattern";

import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { SubFinishClause } from "./interfaces";
import { cloneElement } from "./utils";


export interface ValuesClause<T extends FinishClause | SubFinishClause> {
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
	values( variable:string, valuesBuilder:( builder:PatternBuilder ) => (SupportedNativeTypes | Resource | Literal | Undefined) | (SupportedNativeTypes | Resource | Literal | Undefined)[] ):T;

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
	values( variables:string[], valuesBuilder:( builder:PatternBuilder ) => (SupportedNativeTypes | Resource | Literal | Undefined)[] | (SupportedNativeTypes | Resource | Literal | Undefined)[][] ):T;
}


type Values = SupportedNativeTypes | Resource | Literal | Undefined;

type ValuesOrBuilder =
	| (SupportedNativeTypes | SupportedNativeTypes[])
	| (SupportedNativeTypes[] | SupportedNativeTypes[][])
	| (( builder:PatternBuilder ) => Values | Values[])
	| (( builder:PatternBuilder ) => Values[] | Values[][])
	;

function _normalizeVariables( variableOrVariables:string | string[] ):VariableToken[] {
	if( Array.isArray( variableOrVariables ) )
		return variableOrVariables.map( x => new VariableToken( x ) );

	return [ new VariableToken( variableOrVariables ) ];
}

function _normalizeRawValues( valuesOrBuilder:ValuesOrBuilder, iriResolver:IRIResolver2 ):Values[][] {
	const rawValues:Values | (Values | Values[])[] = typeof valuesOrBuilder === "function" ?
		// FIXME
		valuesOrBuilder( new PatternBuilder( iriResolver as any ) ) :
		valuesOrBuilder;


	if( ! Array.isArray( rawValues ) )
		return [ [ rawValues ] ];

	return rawValues.map( rawValue => {
		if( Array.isArray( rawValue ) ) return rawValue;
		return [ rawValue ];
	} );
}

function createValuesFn<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:ClauseFactory<C, T>, container:C ):ValuesClause<T>[ "values" ] {
	return ( variableOrVariables:string | string[], valuesOrBuilder:ValuesOrBuilder ) => {
		const iriResolver:IRIResolver2 = new IRIResolver2( container.iriResolver );
		const values:Values[][] = _normalizeRawValues( valuesOrBuilder, iriResolver );

		const variables:VariableToken[] = _normalizeVariables( variableOrVariables );

		const token:ValuesToken = new ValuesToken();
		values.forEach( ( valuesRow, index ) => {
			token.addValues( variables[ index ], ...valuesRow.map( convertValue ) );
		} );

		const targetToken = cloneElement( container.targetToken, { values: token } );
		const newContainer = cloneElement( container, { iriResolver, targetToken } as Partial<C> );
		return genericFactory( newContainer, {} );
	}
}


/**
 * @todo
 */
export const ValuesClause = {
	create<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:ClauseFactory<C, T>, container:C, object:T ):T & ValuesClause<T> {
		return Object.assign( object, {
			values: createValuesFn( genericFactory, container ),
		} );
	},
};

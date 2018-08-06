import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { IRIResolver2 } from "../data/IRIResolver2";
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
import { SubFinishClause } from "./interfaces";


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

function _normalizeVariables( variableOrVariables:string | string[] ):VariableToken[] {
	if( Array.isArray( variableOrVariables ) )
		return variableOrVariables.map( x => new VariableToken( x ) );

	return [ new VariableToken( variableOrVariables ) ];
}

function _normalizeRawValues( valuesOrBuilder:ValuesOrBuilder, iriResolver:IRIResolver2 ):Values[][] {
	const rawValues:Values | (Values | Values[])[] = typeof valuesOrBuilder === "function" ?
		valuesOrBuilder( PatternBuilder2.create( iriResolver ) ) :
		valuesOrBuilder;


	if( ! Array.isArray( rawValues ) )
		return [ [ rawValues ] ];

	return rawValues.map( rawValue => {
		if( Array.isArray( rawValue ) ) return rawValue;
		return [ rawValue ];
	} );
}

function createValuesFn<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:Factory<C, T>, container:C ):ValuesClause<T>[ "values" ] {
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
	createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause | SubFinishClause>( genericFactory:Factory<C, T>, container:C, object:T ):T & ValuesClause<T> {
		return Object.assign( object, {
			values: createValuesFn( genericFactory, container ),
		} );
	},
};

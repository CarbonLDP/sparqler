import { Container2 } from "../../data/Container2";
import { cloneElement } from "../../data/utils";

import { ValuesToken } from "../../tokens/ValuesToken";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";
import { Undefined } from "../Undefined";
import { convertValue } from "../utils";

import { NotTriplePattern } from "./NotTriplePattern";


/**
 * @todo
 */
export interface MultipleValuesPattern extends NotTriplePattern<ValuesToken> {
	has( ...value:(SupportedNativeTypes | Resource | Literal | Undefined)[] ):MultipleValuesPatternAnd;
}

/**
 * @todo
 */
export interface MultipleValuesPatternAnd extends NotTriplePattern<ValuesToken> {
	and( ...value:(SupportedNativeTypes | Resource | Literal | Undefined)[] ):MultipleValuesPatternAnd;
}


/**
 * @todo
 */
function getHasFn<C extends Container2<ValuesToken>>( container:C ):MultipleValuesPattern[ "has" ] {
	return ( ...values:(SupportedNativeTypes | Resource | Literal | Undefined)[] ) => {
		const parsedValues = container.targetToken.values.slice();

		for( let i = 0; i < parsedValues.length; i ++ ) {
			if( parsedValues.length <= i ) parsedValues.push( [] );

			parsedValues[ i ] = parsedValues[ i ]
				.concat( convertValue( values[ i ] ) );
		}

		const targetToken = cloneElement( container.targetToken, { values: parsedValues } );
		const newContainer = cloneElement( container, { targetToken } as Partial<C> );

		return MultipleValuesPatternAnd.createFrom( newContainer, {} );
	};
}


/**
 * @todo
 */
export const MultipleValuesPattern = {
	createFrom<C extends Container2<ValuesToken>, O extends object>( container:C, object:O ):MultipleValuesPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn( container ),
		} ) );
	},
};

/**
 * @todo
 */
export const MultipleValuesPatternAnd = {
	createFrom<C extends Container2<ValuesToken>, O extends object>( container:C, object:O ):MultipleValuesPatternAnd {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			and: getHasFn( container ),
		} ) );
	},
};

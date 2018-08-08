import { Container } from "../../data/Container";
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
export interface SingleValuesPattern extends NotTriplePattern<ValuesToken> {
	has( value:SupportedNativeTypes | Resource | Literal | Undefined ):SingleValuesPatternAnd;
}

/**
 * @todo
 */
export interface SingleValuesPatternAnd extends NotTriplePattern<ValuesToken> {
	and( value:SupportedNativeTypes | Resource | Literal | Undefined ):SingleValuesPatternAnd;
}


/**
 * @todo
 */
function getHasFn<C extends Container<ValuesToken>>( container:C ):SingleValuesPattern[ "has" ] {
	return value => {
		const values = container.targetToken.values.slice();
		if( ! values.length ) values.push( [] );
		values[ 0 ] = values[ 0 ].concat( convertValue( value as SupportedNativeTypes ) );

		const targetToken = cloneElement( container.targetToken, { values } );
		const newContainer = cloneElement( container, { targetToken } as Partial<C> );

		return SingleValuesPatternAnd.createFrom( newContainer, {} );
	};
}


/**
 * @todo
 */
export const SingleValuesPattern = {
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):SingleValuesPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn( container ),
		} ) );
	},
};

/**
 * @todo
 */
export const SingleValuesPatternAnd = {
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):SingleValuesPatternAnd {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			and: getHasFn( container ),
		} ) );
	},
};

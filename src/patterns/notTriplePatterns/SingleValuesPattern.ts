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
 * Wrapper for easier usage of SPARQL VALUES patterns that have
 * a single variable.
 */
export interface SingleValuesPattern extends NotTriplePattern<ValuesToken> {
	has( value:SupportedNativeTypes | Resource | Literal | Undefined ):SingleValuesPatternMore;
}

/**
 * Wrapper for add more values to a {@link SingleValuesPattern}.
 */
export interface SingleValuesPatternMore extends NotTriplePattern<ValuesToken> {
	and( value:SupportedNativeTypes | Resource | Literal | Undefined ):SingleValuesPatternMore;
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

		return SingleValuesPatternMore.createFrom( newContainer, {} );
	};
}


/**
 * Constant with utils for {@link SingleValuesPattern} objects.
 */
export const SingleValuesPattern:{
	/**
	 * Factory function that allows to crete a {@link SingleValuesPattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link SingleValuesPattern} statement.
	 * @param object The base base from where to create the
	 * {@link SingleValuesPattern} statement.
	 *
	 * @return The {@link SingleValuesPattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):SingleValuesPattern;
} = {
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):SingleValuesPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn( container ),
		} ) );
	},
};

/**
 * Constant with utils for {@link SingleValuesPatternMore} objects.
 */
export const SingleValuesPatternMore:{
	/**
	 * Factory function that allows to crete a {@link SingleValuesPatternMore}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link SingleValuesPatternMore} statement.
	 * @param object The base base from where to create the
	 * {@link SingleValuesPatternMore} statement.
	 *
	 * @return The {@link SingleValuesPatternMore} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):SingleValuesPatternMore;
} = {
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):SingleValuesPatternMore {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			and: getHasFn( container ),
		} ) );
	},
};

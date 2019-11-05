import { Container } from "../../core/containers/Container";
import { cloneElement } from "../../core/containers/utils";

import { ValuesToken } from "../../tokens/ValuesToken";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";

import { Undefined } from "../Undefined";
import { _valuesTransformerFn } from "./fns/utils";

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
 * Function that creates a generic {@link SingleValuesPattern.has} function.
 * This function is used also for declaring {@link SingleValuesPatternMore.and}
 *
 * @param container The container with the query data for the statement.
 *
 * @private
 */
function getHasFn<C extends Container<ValuesToken>>( container:C ):SingleValuesPattern[ "has" ] {
	const transformer = _valuesTransformerFn( container );

	return value => {
		const values = container.targetToken.values.slice();
		values.push( [ transformer( value ) ] );

		const targetToken = cloneElement( container.targetToken, { values } );
		const newContainer = cloneElement( container, { targetToken } );

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

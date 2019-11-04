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
 * multiple variables.
 */
export interface MultipleValuesPattern extends NotTriplePattern<ValuesToken> {
	has( ...values:(SupportedNativeTypes | Resource | Literal | Undefined)[] ):MultipleValuesPatternMore;
}

/**
 * Wrapper for add more values to a {@link MultipleValuesPattern}.
 */
export interface MultipleValuesPatternMore extends NotTriplePattern<ValuesToken> {
	and( ...values:(SupportedNativeTypes | Resource | Literal | Undefined)[] ):MultipleValuesPatternMore;
}


/**
 * Function that creates a generic {@link MultipleValuesPattern.has} function.
 * This function is used also for declaring {@link MultipleValuesPatternMore.and}
 *
 * @param container The container with the query data for the statement.
 *
 * @private
 */
function getHasFn<C extends Container<ValuesToken>>( container:C ):MultipleValuesPattern[ "has" ] {
	return ( ...values:(SupportedNativeTypes | Resource | Literal | Undefined)[] ) => {
		const parsedValues = container.targetToken.values.slice();
		parsedValues.push( values.map( _valuesTransformerFn( container ) ) );

		const targetToken = cloneElement( container.targetToken, { values: parsedValues } );
		const newContainer = cloneElement( container, { targetToken } );

		return MultipleValuesPatternMore.createFrom( newContainer, {} );
	};
}


/**
 * Constant with utils for {@link MultipleValuesPattern} objects.
 */
export const MultipleValuesPattern:{
	/**
	 * Factory function that allows to crete a {@link MultipleValuesPattern}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link MultipleValuesPattern} statement.
	 * @param object The base base from where to create the
	 * {@link MultipleValuesPattern} statement.
	 *
	 * @return The {@link MultipleValuesPattern} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):MultipleValuesPattern;
} = {
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):MultipleValuesPattern {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn( container ),
		} ) );
	},
};

/**
 * Constant with utils for {@link MultipleValuesPatternMore} objects.
 */
export const MultipleValuesPatternMore:{
	/**
	 * Factory function that allows to crete a {@link MultipleValuesPatternMore}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link MultipleValuesPatternMore} statement.
	 * @param object The base base from where to create the
	 * {@link MultipleValuesPatternMore} statement.
	 *
	 * @return The {@link MultipleValuesPatternMore} statement created from the
	 * {@param object} provided.
	 */
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):MultipleValuesPatternMore;
} = {
	createFrom<C extends Container<ValuesToken>, O extends object>( container:C, object:O ):MultipleValuesPatternMore {
		return NotTriplePattern.createFrom( container, Object.assign( object, {
			and: getHasFn( container ),
		} ) );
	},
};

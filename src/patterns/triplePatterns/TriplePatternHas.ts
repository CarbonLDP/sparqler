import { Container } from "../../data/Container";
import { cloneElement } from "../../data/utils";

import { ObjectToken } from "../../tokens/ObjectToken";
import { PropertyToken } from "../../tokens/PropertyToken";
import { TripleToken } from "../../tokens/TripleToken";
import { VariableOrIRIToken } from "../../tokens/VariableOrIRIToken";

import { Pattern } from "../Pattern";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { _resolvePath, convertValue } from "../utils";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { Resource } from "./Resource";
import { TriplePattern } from "./TriplePattern";
import { Variable } from "./Variable";


/**
 * Object with that contains the helper {@link TriplePatternHas.has}
 * which creates a complete {@link Pattern} to be used where required.
 */
export interface TriplePatternHas<T extends ObjectToken> extends TriplePattern<T> {
	/**
	 * Assign a property and values to the triple to create a correct
	 * complete pattern.
	 *
	 * @param property The property to be added in the triple.
	 * @param objects The value(s) the property added have.
	 *
	 * @return Object that allows to add more data to the triple.
	 */
	has( property:Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty) | (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):TriplePatternAnd<T>;
}

/**
 * Object with that contains the helper {@link TriplePatternHas.and}
 * which adds new data to the {@link Pattern} to be used.
 */
export interface TriplePatternAnd<T extends ObjectToken> extends Pattern<TripleToken<T>> {
	/**
	 * Added another property and values to the triple the pattern.
	 *
	 * @param property The property to be added in the triple.
	 * @param objects The value(s) the property added have.
	 *
	 * @return Object that allows to add more data to the triple.
	 */
	and( property:Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty) | (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):TriplePatternAnd<T>;
}


type Objects = SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty;

/**
 * Function that creates a generic {@link TriplePatternHas.has} function.
 * This function is used for create {@link TriplePatternHas} and {@link TriplePatternAnd}
 *
 * @param container The container that is bound to the TriplePatternHas methods.
 *
 * @private
 */
function getHasFn<T extends ObjectToken, C extends Container<TripleToken<T>>>( container:C ):TriplePatternHas<T>[ "has" ] {
	return ( property:string | Variable | Resource, objects:Objects | Objects[] ) => {
		const verbToken:VariableOrIRIToken | "a" = (typeof property === "string")
			? _resolvePath( container, property )
			: property.getSubject();

		const propertyToken:PropertyToken = new PropertyToken( verbToken );

		objects = Array.isArray( objects ) ? objects : [ objects ];
		propertyToken.addObject( ...objects.map( convertValue ) );

		const properties = container.targetToken.properties.concat( propertyToken );
		const targetToken = cloneElement( container.targetToken, { properties } );

		const newContainer = cloneElement( container, { targetToken } as Partial<C> );
		return TriplePatternAnd.createFrom<T, C, {}>( newContainer, {} );
	};
}


/**
 * Constant with the utils for {@link TriplePatternHas} objects.
 */
export const TriplePatternHas:{
	/**
	 * Factory function that allows to crete a {@link TriplePatternHas}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link TriplePatternHas} statement.
	 * @param object The base base from where to create the
	 * {@link TriplePatternHas} statement.
	 *
	 * @return The {@link TriplePatternHas} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternHas<T>;
} = {
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternHas<T> {
		return TriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn<T, C>( container ),
		} ) );
	}
};

/**
 * Constant with the utils for {@link TriplePatternAnd} objects.
 */
export const TriplePatternAnd:{
	/**
	 * Factory function that allows to crete a {@link TriplePatternAnd}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link TriplePatternAnd} statement.
	 * @param object The base base from where to create the
	 * {@link TriplePatternAnd} statement.
	 *
	 * @return The {@link TriplePatternAnd} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternAnd<T>;
} = {
	createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternAnd<T> {
		return Pattern.createFrom( container, Object.assign( object, {
			and: getHasFn<T, C>( container ),
		} ) );
	}
};
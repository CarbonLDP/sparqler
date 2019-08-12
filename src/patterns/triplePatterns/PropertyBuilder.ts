import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";
import { cloneElement } from "../../data/utils";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { PathToken } from "../../tokens/PathToken";
import { PropertyToken } from "../../tokens/PropertyToken";
import { TripleToken } from "../../tokens/TripleToken";
import { VariableToken } from "../../tokens/VariableToken";

import { Path } from "../paths/Path";
import { getPropertyToken } from "../paths/utils";

import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { convertValue } from "../utils";

import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { Resource } from "./Resource";
import { Variable } from "./Variable";


/**
 * Object that allows to add a property to the triple related.
 */
export interface PropertyBuilder<T extends object> {
	/**
	 * Assign a property and values to the triple statement.
	 *
	 * @param property The property to be added in the triple.
	 * @param objects The value(s) the property added have.
	 *
	 * @return Object that allows to add more data to the triple.
	 */
	has( property:Path | Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty) | (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):PropertyBuilderMore<T> & T;
}

/**
 * Object that allows to add more properties to the triple related.
 */
export interface PropertyBuilderMore<T extends object> {
	/**
	 * Added another property and values to the triple.
	 *
	 * @param property The property to be added in the triple.
	 * @param objects The value(s) the property added have.
	 *
	 * @return Object that allows to add more data to the triple.
	 */
	and( property:Path | Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty) | (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):PropertyBuilderMore<T> & T;
}


type Objects = SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty;

function _cloneContainer<C extends Container<TripleToken | BlankNodePropertyToken>>( container:C, propertyToken:PropertyToken ):C {
	const properties = container.targetToken.properties.concat( propertyToken );
	const targetToken = cloneElement( container.targetToken, { properties } );
	return cloneElement( container, { targetToken } as Partial<C> );
}

function _updateContainer<C extends Container<TripleToken | BlankNodePropertyToken>>( container:C, propertyToken:PropertyToken ):C {
	container.targetToken.properties.push( propertyToken );
	return container;
}

/**
 * Function that creates a generic {@link PropertyBuilder#has `PropertyBuilder.has`} function.
 * This function is used for create {@link PropertyBuilder} and {@link PropertyBuilderMore}
 *
 * @param genericFactory The factory of the generic expected to be returned.
 * @param container The container that is bound to the PropertyBuilder methods.
 *
 * @private
 */
function getHasFn<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>>( genericFactory:Factory<C, T>, container:C ):PropertyBuilder<T>[ "has" ] {
	return ( property:string | Variable | Resource | Path, objects:Objects | Objects[] ) => {
		const verbToken:VariableToken | PathToken = getPropertyToken( container, property );
		const propertyToken:PropertyToken = new PropertyToken( verbToken );

		objects = Array.isArray( objects ) ? objects : [ objects ];
		propertyToken.addObject( ...objects.map( convertValue ) );

		const newContainer = container.targetToken.token === "subject" ?
			_cloneContainer( container, propertyToken ) :
			_updateContainer( container, propertyToken );

		const genericObject:T = genericFactory( newContainer, {} );
		return PropertyBuilderMore.createFrom( genericFactory, newContainer, genericObject );
	};
}


/**
 * Constant with the utils for {@link PropertyBuilder} objects.
 */
export const PropertyBuilder:{
	/**
	 * Factory function that allows to crete a {@link PropertyBuilder}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory of the generic expected to
	 * be returned by the {@link PropertyBuilder#has `PropertyBuilder.has`} method.
	 * @param container The related container with the data for the
	 * {@link PropertyBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PropertyBuilder} statement.
	 *
	 * @return The {@link PropertyBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & PropertyBuilder<T>;
} = {
	createFrom<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & PropertyBuilder<T> {
		return Object.assign( object, {
			has: getHasFn( genericFactory, container ),
		} );
	}
};

/**
 * Constant with the utils for {@link PropertyBuilderMore} objects.
 */
export const PropertyBuilderMore:{
	/**
	 * Factory function that allows to crete a {@link PropertyBuilderMore}
	 * from the {@param object} provided.
	 *
	 * @param genericFactory The factory of the generic expected to
	 * be returned by the {@link PropertyBuilderMore.and} method.
	 * @param container The related container with the data for the
	 * {@link PropertyBuilderMore} statement.
	 * @param object The base base from where to create the
	 * {@link PropertyBuilderMore} statement.
	 *
	 * @return The {@link PropertyBuilderMore} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & PropertyBuilderMore<T>;
} = {
	createFrom<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>, O extends object>( genericFactory:Factory<C, T>, container:C, object:O ):O & PropertyBuilderMore<T> {
		return Object.assign( object, {
			and: getHasFn( genericFactory, container ),
		} );
	}
};
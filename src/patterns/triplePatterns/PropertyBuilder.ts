import { Container } from "../../core/containers/Container";
import { cloneElement } from "../../core/containers/utils";
import { Factory } from "../../core/factories/Factory";

import { Path } from "../../paths/Path";
import { getPropertyToken } from "../../paths/utils";

import { SupportedNativeTypes } from "../../SupportedNativeTypes";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { ObjectToken } from "../../tokens/ObjectToken";
import { PathToken } from "../../tokens/PathToken";
import { PropertyToken } from "../../tokens/PropertyToken";
import { SubjectToken } from "../../tokens/SubjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { VariableToken } from "../../tokens/VariableToken";

import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { _subjectTransformerFn } from "./fns/utils";
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
	return cloneElement( container, { targetToken } );
}

function _updateContainer<C extends Container<TripleToken | BlankNodePropertyToken>>( container:C, propertyToken:PropertyToken ):C {
	container.targetToken.properties.push( propertyToken );
	return container;
}

function _getNewContainer<C extends Container<TripleToken | ObjectToken>, C2 extends Container<TripleToken | BlankNodePropertyToken>>( container:C, property:PropertyToken ):C2 {
	if( container.targetToken.token === "subject" ) {
		return _cloneContainer( container as Container<TripleToken>, property ) as C2;
	}

	// TODO: Is this the best solution?
	if( container.targetToken.token === "blankNodeProperty" ) {
		return _updateContainer( container as Container<BlankNodePropertyToken>, property ) as any as C2;
	}

	const newContainer:Container<TripleToken> = cloneElement( container, {
		targetToken: new SubjectToken( container.targetToken ),
	} );
	return _updateContainer( newContainer, property ) as C2;
}

/**
 * Function that creates a generic {@link PropertyBuilder.has} function.
 * This function is used for create {@link PropertyBuilder} and {@link PropertyBuilderMore}
 *
 * @param genericFactory The factory of the generic expected to be returned.
 * @param container The container that is bound to the PropertyBuilder methods.
 *
 * @private
 */
function getHasFn<T extends object, C extends Container<TripleToken | ObjectToken>, C2 extends Container<TripleToken | BlankNodePropertyToken>>( genericFactory:Factory<C2, T>, container:C ):PropertyBuilder<T>[ "has" ] {
	return ( property:string | Variable | Resource | Path, objects:Objects | Objects[] ) => {
		const verbToken:VariableToken | PathToken = getPropertyToken( container, property );
		const propertyToken:PropertyToken = new PropertyToken( verbToken );

		objects = Array.isArray( objects ) ? objects : [ objects ];
		propertyToken.addObject( ...objects.map( _subjectTransformerFn( container ) ) );

		const newContainer:C2 = _getNewContainer( container, propertyToken );

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
	 * be returned by the {@link PropertyBuilder.has} method.
	 * @param container The related container with the data for the
	 * {@link PropertyBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PropertyBuilder} statement.
	 *
	 * @return The {@link PropertyBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<T extends object, C extends Container<ObjectToken>, C2 extends Container<TripleToken>, O extends object>( genericFactory:Factory<C2, T>, container:C, object:O ):O & PropertyBuilder<T>;
} = {
	createFrom<T extends object, C extends Container<ObjectToken>, C2 extends Container<TripleToken>, O extends object>( genericFactory:Factory<C2, T>, container:C, object:O ):O & PropertyBuilder<T> {
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
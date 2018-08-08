import { Container2 } from "../../data/Container2";

import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { PropertyToken } from "../../tokens/PropertyToken";
import { VariableOrIRIToken } from "../../tokens/VariableOrIRIToken";

import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { _resolvePath, convertValue } from "../utils";

import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { Resource } from "./Resource";
import { Variable } from "./Variable";


/**
 * @todo
 */
export interface BlankNodeBuilder {
	has( property:Variable | Resource | "a" | string, object:SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty ):BlankNodeBuilderAnd;
	has( property:Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):BlankNodeBuilderAnd;
}

/**
 * @todo
 */
export interface BlankNodeBuilderAnd {
	and( property:Variable | Resource | "a" | string, object:SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty ):BlankNodeBuilderAnd;
	and( property:Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):BlankNodeBuilderAnd;
}


type Objects = SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty;

/**
 * @todo
 */
function getHasFn<C extends Container2<BlankNodePropertyToken>>( container:C ):BlankNodeBuilder[ "has" ] {
	return ( property:string | Variable | Resource, objects:Objects | Objects[] ) => {
		// TODO: Merge repeated code from TriplePatternHas
		const verbToken:VariableOrIRIToken | "a" = (typeof property === "string")
			? _resolvePath( container, property )
			: property.getSubject();

		const propertyToken:PropertyToken = new PropertyToken( verbToken );

		objects = Array.isArray( objects ) ? objects : [ objects ];
		propertyToken.addObject( ...objects.map( convertValue ) );

		container.targetToken.properties
			.push( propertyToken );

		return BlankNodeBuilderAnd.createFrom( container, {} );
	};
}


/**
 * @todo
 */
export const BlankNodeBuilder = {
	createFrom<C extends Container2<BlankNodePropertyToken>, O extends object>( container:C, object:O ):O & BlankNodeBuilder {
		return Object.assign( object, {
			has: getHasFn( container ),
		} );
	}
};

/**
 * @todo
 */
export const BlankNodeBuilderAnd = {
	createFrom<C extends Container2<BlankNodePropertyToken>, O extends object>( container:C, object:O ):O & BlankNodeBuilderAnd {
		return Object.assign( object, {
			and: getHasFn( container ),
		} );
	}
};
import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { cloneElement } from "../data/utils";

import { ObjectToken } from "../tokens/ObjectToken";
import { PropertyToken } from "../tokens/PropertyToken";
import { TripleToken } from "../tokens/TripleToken";
import { VariableOrIRIToken } from "../tokens/VariableOrIRIToken";

import { Pattern } from "./Pattern";
import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePattern } from "./TriplePattern";
import { BlankNodeProperty } from "./triplePatterns/BlankNodeProperty";
import { Collection } from "./triplePatterns/Collection";
import { Literal } from "./triplePatterns/Literal";
import { Resource } from "./triplePatterns/Resource";
import { Variable } from "./triplePatterns/Variable";
import { _resolvePath, convertValue } from "./utils";


/**
 * @todo
 */
export interface TriplePatternHas<T extends ObjectToken> extends TriplePattern<T> {
	has( property:Variable | Resource | "a" | string, object:SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty ):TriplePatternAnd<T>;
	has( property:Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):TriplePatternAnd<T>;
}

/**
 * @todo
 */
export interface TriplePatternAnd<T extends ObjectToken> extends TriplePattern<T>, Pattern<TripleToken<T>> {
	// TODO: Add Collection
	and( property:Variable | Resource | "a" | string, object:SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty ):TriplePatternAnd<T>;
	and( property:Variable | Resource | "a" | string, objects:(SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[] ):TriplePatternAnd<T>;
}


type Objects = SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty;

/**
 * @todo
 */
function getHasFn<T extends ObjectToken, C extends Container2<TripleToken<T>>>( container:C ):TriplePatternHas<T>[ "has" ] {
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
 * @todo
 */
export const TriplePatternHas = {
	createFrom<T extends ObjectToken, C extends Container2<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternHas<T> {
		return TriplePattern.createFrom( container, Object.assign( object, {
			has: getHasFn<T, C>( container ),
		} ) );
	}
};

/**
 * @todo
 */
export const TriplePatternAnd = {
	createFrom<T extends ObjectToken, C extends Container2<TripleToken<T>>, O extends object>( container:C, object:O ):O & TriplePatternAnd<T> {
		return Factory.createFrom<C, Pattern<TripleToken<T>>, TriplePattern<T>>(
			Pattern.createFrom,
			TriplePattern.createFrom,
		)( container, Object.assign( object, {
			and: getHasFn<T, C>( container ),
		} ) );
	}
};
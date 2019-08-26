import { Container } from "../data/Container";

import { Resource } from "../patterns/triplePatterns/Resource";
import { Variable } from "../patterns/triplePatterns/Variable";

import { IRIToken } from "../tokens/IRIToken";
import { PathToken } from "../tokens/PathToken";
import { VariableToken } from "../tokens/VariableToken";

import { Path } from "./Path";


/**
 * Obtain the token representation from the property provided.
 *
 * @param container The general container with the {@link IRIResolver}
 * that will be used to resolve a string property.
 * @param property The property to obtain its token.
 */
export function getPropertyToken<T extends PathToken>( container:Container<any>, property:Resource | "a" | string | Path<T> | PathToken ):IRIToken | "a" | T;
export function getPropertyToken<T extends PathToken>( container:Container<any>, property:Variable | Resource | "a" | string | Path<T> ):VariableToken | IRIToken | "a" | T;
export function getPropertyToken<T extends PathToken>( container:Container<any>, property:Variable | Resource | "a" | string | Path<T> | PathToken ):VariableToken | IRIToken | "a" | T {
	if( property === "a" )
		return property;

	if( typeof property === "string" )
		return container.iriResolver.resolve( property, true );

	if( "token" in property )
		return property as T;

	if( "getSubject" in property )
		return property.getSubject();

	return property.getPath();
}
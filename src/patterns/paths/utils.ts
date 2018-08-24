import { Container } from "../../data/Container";

import { IRIToken } from "../../tokens/IRIToken";
import { PathToken } from "../../tokens/PathToken";

import { Resource } from "../triplePatterns/Resource";

import { Path } from "./Path";


/**
 * Obtain the token representation from the property provided.
 *
 * @param container The general container with the {@link IRIResolver}
 * that will be used to resolve a string property.
 * @param property The property to obtain its token.
 */
export function getPropertyToken<T extends PathToken>( container:Container<any>, property:Resource | "a" | string | Path<T> | PathToken ):IRIToken | "a" | T {
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
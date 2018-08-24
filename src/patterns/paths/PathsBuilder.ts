import { Container } from "../../data/Container";

import { IRIToken } from "../../tokens/IRIToken";
import { PathToken } from "../../tokens/PathToken";

import { Resource } from "../triplePatterns/Resource";

import { Path } from "./Path";
import { PathBuilder } from "./PathBuilder";
import { parseProperty } from "./utils";


/**
 * Object with the methods to build a property path.
 */
export interface PathsBuilder {
	path( property:Resource | "a" | string ):Path<IRIToken | "a">;
	path<T extends Path<PathToken>>( builderFn:( pathBuilder:PathBuilder ) => T ):T;
}


function getPathFn( container:Container<undefined> ):PathsBuilder[ "path" ] {
	return ( propertyOrBuilderFn:Resource | "a" | string | (( pathBuilder:PathBuilder ) => Path<PathToken>) ):any => {
		if( typeof propertyOrBuilderFn !== "function" )
			return parseProperty( container, propertyOrBuilderFn );

		const pathBuilder:PathBuilder = PathBuilder.createFrom( container, {} );
		return propertyOrBuilderFn( pathBuilder );
	};
}


/**
 * Constant with the utils for {@link PathsBuilder} objects.
 */
export const PathsBuilder:{
	/**
	 * Factory function that allows to crete a {@link PathsBuilder}
	 * from the {@param object} provided.
	 *
	 * @param container The related container with the data for the
	 * {@link PathsBuilder} statement.
	 * @param object The base base from where to create the
	 * {@link PathsBuilder} statement.
	 *
	 * @return The {@link PathsBuilder} statement created from the
	 * {@param object} provided.
	 */
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & PathsBuilder;
} = {
	createFrom<O extends object>( container:Container<undefined>, object:O ):O & PathsBuilder {
		return Object.assign( object, {
			path: getPathFn( container ),
		} )
	}
};

import { Container } from "../../data/Container";

import { IRIToken } from "../../tokens/IRIToken";
import { PathToken } from "../../tokens/PathToken";

import { Resource } from "../triplePatterns/Resource";

import { Path } from "./Path";
import { PathBuilder } from "./PathBuilder";
import { getPropertyToken } from "./utils";


/**
 * Object with the methods to build a property path.
 */
export interface PathsBuilder {
	path( property:Resource | "a" | string ):Path<IRIToken | "a">;
	path<T extends Path<PathToken>>( builderFn:( pathBuilder:PathBuilder ) => T ):T;
}


/**
 * Create a {@link Path} from the property provided.
 *
 * @param container The general container with the {@link IRIResolver}
 * that will be used to resolve a string property.
 * @param property The property to be converted into a Path.
 */
function _parseProperty( container:Container<any>, property:Resource | "a" | string ):Path<IRIToken | "a"> {
	const targetToken:IRIToken | "a" = getPropertyToken( container, property );

	const newContainer:Container<IRIToken | "a"> = new Container( {
		iriResolver: container.iriResolver,
		targetToken,
	} );
	return Path.createFrom( newContainer, {} );
}

function getPathFn( container:Container<undefined> ):PathsBuilder[ "path" ] {
	return ( propertyOrBuilderFn:Resource | "a" | string | (( pathBuilder:PathBuilder ) => Path<PathToken>) ):any => {
		if( typeof propertyOrBuilderFn !== "function" )
			return _parseProperty( container, propertyOrBuilderFn );

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

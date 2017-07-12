import { Container } from "sparqler/clauses";

/**
 * Interface to represents the functions to bind by the {@link genericDecorator}
 */
export interface FunctionProperties {
	[ method:string ]:Function;
}

/**
 * Function that takes a set of function properties to bind with a container and add them to the provided object.
 * @param properties Object with the function properties to bind to the container provided.
 * @param container Data container that will be used to bind the functions provided.
 * @param object Object that will be added with the bound function properties.
 * @returns The same object provided with the added function properties.
 */
export function genericDecorator<U extends FunctionProperties, W extends object>( properties:U, container:Container<any>, object:W ):W & U {
	for( const key of Object.keys( properties ) ) properties[ key ] = properties[ key ].bind( container );
	return Object.assign<W, U>( object, properties );
}

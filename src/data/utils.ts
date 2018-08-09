/**
 * Function used to create shallow clones of immutable objects, with
 * the option to replace with new values the respective element.
 *
 * @param element The immutable object to the cloned.
 * @param newValues Optional object with the new values to be replaced.
 *
 * @return The shallow clone with the replaces values, in read-only
 * using the {@link Object.freeze} method.
 */
export function cloneElement<T extends object, P extends Partial<T>>( element:T, newValues:P = {} as P ):Readonly<T & P> {
	const base:T = Object.create( Object.getPrototypeOf( element ) );

	const clone:T & P = Object
		.assign( base, element, newValues );

	return Object.freeze( clone );
}

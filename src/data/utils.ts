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
export function cloneElement<K extends keyof T, T extends object, W extends { [P in K]?:any }>( element:T, newValues:{ [P in K]:W[P] } = {} as W ):Readonly<T & W> {
	const base:T = Object.create( Object.getPrototypeOf( element ) );

	const clone:T & W = Object
		.assign( base, element, newValues as W );

	return Object.freeze( clone );
}

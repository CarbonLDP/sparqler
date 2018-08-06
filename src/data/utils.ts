export function cloneElement<T extends object, P extends Partial<T>>( element:T, newValues:P = {} as P ):T & P {
	const clone:T = Object.create( Object.getPrototypeOf( element ) );

	return Object
		.assign( clone, element, newValues );
}

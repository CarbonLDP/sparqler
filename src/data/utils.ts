export function cloneElement<T extends object>( element:T, newValues:Partial<T> = {} ):T {
	const clone:T = Object.create( Object.getPrototypeOf( element ) );

	return Object
		.assign( clone, element, newValues );
}

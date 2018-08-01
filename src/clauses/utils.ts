export function cloneElement<T extends object>( element:T, newValues:Partial<T> = {} ):T {
	const clone:T = Object.create( Object.getPrototypeOf( element ) );

	return Object
		.assign( clone, element, newValues );
}

export function _cloneElement<T extends any>( container:T, newValues:Partial<T> ):T {
	const clone:T = Object.create( Object.getPrototypeOf( container ) );

	Object
		.keys( container )
		.forEach( key => {
			if( key in newValues ) {
				const value:any = newValues[ key ];

				if( value !== void 0 ) {
					clone[ key ] = value;
					return;
				}
			}

			clone[ key ] = container[ key ];
		} );

	return clone;
}

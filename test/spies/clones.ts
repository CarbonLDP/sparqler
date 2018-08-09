import { Container } from "../../src/data/Container";

import * as DataUtilsModule from "../../src/data/utils";

import { TokenNode } from "../../src/tokens/TokenNode";


let clonesSpy:jasmine.Spy;
beforeEach( () => {
	clonesSpy = spyOn( DataUtilsModule, "cloneElement" )
		.and.callThrough();
} );

export function getLastContainer<T extends Container<TokenNode>>():T {
	const target:T | undefined = clonesSpy
		.calls.all()
		.reverse()
		.map( x => x.returnValue )
		.find( x => x instanceof Container );

	if( ! target ) throw new Error( "No Container was created." );
	return target;
}

import { Container } from "../../src/data/Container";
import * as DataUtilsModule from "../../src/data/utils";

import { TokenNode } from "../../src/tokens/TokenNode";


let clonesSpy:jasmine.Spy | undefined;
export const spyClones = {
	install() {
		clonesSpy = spyOn( DataUtilsModule, "cloneElement" )
			.and.callThrough();
	},
	uninstall() {
		clonesSpy = void 0;
	},

	getLastContainer<T extends Container<TokenNode>>():T {
		if( ! clonesSpy ) throw new Error( "The spy clone has not been installed." );

		const target:T | undefined = clonesSpy
			.calls.all()
			.reverse()
			.map( x => x.returnValue )
			.find( x => x instanceof Container );

		if( ! target ) throw new Error( "No Container was created." );
		return target;
	}
};

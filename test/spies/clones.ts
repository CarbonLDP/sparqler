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

	getAll<T extends object>():T[] {
		if( ! clonesSpy ) throw new Error( "The spy clone has not been installed." );

		return clonesSpy
			.calls.all()
			.reverse()
			.map( x => x.returnValue )
			;
	}
};


export const spyContainers = {
	install() {
		if( clonesSpy ) return;
		spyClones.install();
	},
	uninstall() {
		spyClones.uninstall()
	},

	getLast<T extends Container<TokenNode>>():T {
		const target:T | undefined = spyClones
			.getAll()
			.find( ( x ):x is T => x instanceof Container );

		if( ! target ) throw new Error( "No Container was created." );
		return target;
	},
};

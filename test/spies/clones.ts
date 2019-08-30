import { Container } from "../../src/core/containers/Container";
import * as DataUtilsModule from "../../src/core/containers/utils";


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
		if( !clonesSpy ) throw new Error( "The spy clone has not been installed." );

		return clonesSpy
			.calls.all()
			.slice()
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

	getAll<T extends Container<any>>():T[] {
		return spyClones
			.getAll()
			.filter( ( x ):x is T => x instanceof Container );
	},

	getFirst<T extends Container<any>>():T {
		const target:T | undefined = spyContainers
			.getAll<T>()
			.pop();

		if( !target ) throw new Error( "No Container was created." );
		return target;
	},

	getLast<T extends Container<any>>():T {
		const target:T | undefined = spyContainers
			.getAll<T>()
			.shift();

		if( !target ) throw new Error( "No Container was created." );
		return target;
	},
};

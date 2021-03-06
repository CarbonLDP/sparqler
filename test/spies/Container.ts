import * as ContainerModule from "../../src/core/containers/Container";
import { Container } from "../../src/core/containers/Container";

// Store constructor before replacing
const Constructor = Container;

let containerSpy:jasmine.Spy | undefined;
export const spyContainers = {
	install():void {
		containerSpy = spyOn( ContainerModule, "Container" )
			.and.callFake( ( ...args:[ any ] ) => new Constructor( ...args ) );
	},
	uninstall():void {
		containerSpy = void 0;
	},

	getLast<T extends Container<any>>():T {
		if( !containerSpy ) throw new Error( "The spy container has not been installed." );

		const target:jasmine.CallInfo | undefined = containerSpy
			.calls.mostRecent();

		if( !target ) throw new Error( "No Container was created." );
		return target.returnValue;
	},

	getFirst<T extends Container<any>>():T {
		if( !containerSpy ) throw new Error( "The spy container has not been installed." );

		const target:jasmine.CallInfo | undefined = containerSpy
			.calls.first();

		if( !target ) throw new Error( "No Container was created." );
		return target.returnValue;
	}
};

import * as ContainerModule from "../../src/patterns/paths/FluentPathContainer";
import { FluentPathContainer } from "../../src/patterns/paths/FluentPathContainer";


let containerSpy:jasmine.Spy | undefined;
export const spyContainers = {
	install():void {
		containerSpy = spyOn( ContainerModule, "FluentPathContainer" )
			.and.callThrough();
	},
	uninstall():void {
		containerSpy = void 0;
	},

	getLast<T extends FluentPathContainer<any>>():T {
		if( ! containerSpy ) throw new Error( "The spy container has not been installed." );

		const target:jasmine.CallInfo | undefined = containerSpy
			.calls.mostRecent();

		if( ! target ) throw new Error( "No FluentPathContainer was created." );
		return target.object;
	}
};


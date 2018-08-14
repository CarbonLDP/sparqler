import { Container } from "../../src/data/Container";
import * as ContainerModule from "../../src/data/Container";

import { TokenNode } from "../../src/tokens/TokenNode";


let containerSpy:jasmine.Spy | undefined;
export const spyContainers = {
	install():void {
		containerSpy = spyOn( ContainerModule, "Container" )
			.and.callThrough();
	},
	uninstall():void {
		containerSpy = void 0;
	},

	getLast<T extends Container<TokenNode>>():T {
		if( ! containerSpy ) throw new Error( "The spy container has not been installed." );

		const target:jasmine.CallInfo | undefined = containerSpy
			.calls.mostRecent();

		if( ! target ) throw new Error( "No Container was created." );
		return target.object;
	}
};

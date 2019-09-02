import { Container } from "../../src/core/containers/Container";
import { IRIResolver } from "../../src/core/iri/IRIResolver";

import { DeniableFluentPath } from "../../src/patterns/paths/DeniableFluentPath";
import { FluentPath } from "../../src/patterns/paths/FluentPath";
import { FluentPathContainer } from "../../src/patterns/paths/FluentPathContainer";

import { PathToken } from "../../src/tokens/PathToken";


export function getFluentPathContainer<T extends PathToken | undefined>( token:T ):FluentPathContainer<T> {
	return new class extends Container<T> implements FluentPathContainer<T> {
		fluentPathFactory = FluentPath.createFrom;
		deniableFluentPathFactory = DeniableFluentPath.createFrom;

		constructor() {
			super( {
				iriResolver: new IRIResolver(),
				targetToken: token!,
			} );
		}
	};
}

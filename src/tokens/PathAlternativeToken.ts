import { PathInAlternativeToken } from "./PathInAlternativeToken";


/**
 * Token for the alternative paths statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathAlternative}
 */
export class PathAlternativeToken<T extends PathInAlternativeToken = PathInAlternativeToken> {
	readonly token:"pathAlternative" = "pathAlternative";
	readonly paths:T[];

	constructor() {
		this.paths = [];
	}


	toString():string {
		return this.paths
			.join( "|" );
	}
}

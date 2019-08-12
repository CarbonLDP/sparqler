import { PathInAlternativeToken } from "./PathInAlternativeToken";


/**
 * Token for the alternative paths statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathAlternative
 */
export class PathAlternativeToken<T extends PathInAlternativeToken = PathInAlternativeToken> {
	readonly token:"pathAlternative" = "pathAlternative";
	readonly paths:T[];

	constructor() {
		this.paths = [];
	}


	addPath( path:T ):this {
		this.paths.push( path );

		return this;
	}


	toString():string {
		return this.paths
			.join( "|" );
	}
}

import { PathEltToken } from "./PathEltToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for inverting a path statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathEltOrInverse
 */
export class PathInverseToken<T extends PathEltToken = PathEltToken> implements TokenNode {
	readonly token:"pathInverse" = "pathInverse";
	readonly path:T;

	constructor( path:T ) {
		this.path = path;
	}

	toString():string {
		return `^${ this.path }`;
	}
}

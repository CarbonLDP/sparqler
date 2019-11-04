import { PathToken } from "./PathToken";
import { TokenNode } from "./TokenNode";


/**
 * Class with the implementation of a sub-path token.
 *
 * Used to separate logic and types of {@link SubPathToken} and
 * {@link SubPathInNegatedToken}.
 */
export class SharedSubPathToken<T extends PathToken | undefined> implements TokenNode {
	readonly token:"subPath" = "subPath";
	readonly path:T;

	constructor( path:T ) {
		this.path = path;
	}

	toString():string {
		if( !this.path ) return "()";
		return `(${ this.path })`;
	}
}

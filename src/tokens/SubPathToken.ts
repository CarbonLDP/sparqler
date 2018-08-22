import { PathToken } from "./PathToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for grouping a path token inside a parenthesis.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathPrimary}
 */
export class SubPathToken<T extends PathToken | undefined> implements TokenNode {
	readonly token:"subPath" = "subPath";
	readonly path:T;

	constructor( path:T ) {
		this.path = path;
	}

	toString():string {
		if( ! this.path ) return "()";
		return `(${ this.path })`;
	}
}

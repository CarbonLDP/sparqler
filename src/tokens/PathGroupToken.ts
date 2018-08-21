import { PathToken } from "./PathToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for grouping a path token inside a parenthesis.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathPrimary}
 */
export class PathGroupToken implements TokenNode {
	readonly token:"pathGroup" = "pathGroup";
	readonly path:PathToken | undefined;

	constructor( path:PathToken | undefined ) {
		this.path = path;
	}

	toString():string {
		if( ! this.path ) return "()";
		return `(${ this.path })`;
	}
}

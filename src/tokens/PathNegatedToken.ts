import { PathInGroupNegatedToken } from "./PathInGroupNegatedToken";
import { PathInNegatedToken } from "./PathInNegatedToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for the negation of a path statement.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathPrimary}
 */
export class PathNegatedToken implements TokenNode {
	readonly token:"pathNegated" = "pathNegated";
	readonly path:PathInNegatedToken | PathInGroupNegatedToken;

	constructor( path:PathInNegatedToken | PathInGroupNegatedToken ) {
		this.path = path;
	}

	toString():string {
		return `!${ this.path }`;
	}
}
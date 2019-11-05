import { PathInNegatedToken } from "./PathInNegatedToken";
import { SubPathInNegatedToken } from "./SubPathInNegatedToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for the negation of a path statement.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathPrimary
 */
export class PathNegatedToken implements TokenNode {
	readonly token:"pathNegated" = "pathNegated";
	readonly path:PathInNegatedToken | SubPathInNegatedToken;

	constructor( path:PathInNegatedToken | SubPathInNegatedToken ) {
		this.path = path;
	}

	toString():string {
		return `!${ this.path }`;
	}
}
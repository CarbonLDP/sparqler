import { PathPrimaryToken } from "./PathPrimaryToken";
import { TokenNode } from "./TokenNode";


/**
 * Token for the primary path with an specific mod.
 *
 * @see https://www.w3.org/TR/sparql11-query/#rPathMod
 */
export class PathModToken implements TokenNode {
	readonly token:"pathMod" = "pathMod";
	readonly path:PathPrimaryToken;
	readonly mod:"?" | "*" | "+";

	constructor( path:PathPrimaryToken, mod:"?" | "*" | "+" ) {
		this.path = path;
		this.mod = mod;
	}

	toString():string {
		return `${ this.path }${ this.mod }`;
	}
}

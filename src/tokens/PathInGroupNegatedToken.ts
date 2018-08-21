import { PathAlternativeToken } from "./PathAlternativeToken";
import { PathGroupToken } from "./PathGroupToken";
import { PathInNegatedToken } from "./PathInNegatedToken";


/**
 * Token of the group accepted by {@link PathNegatedToken}.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#rPathNegatedPropertySet}
 */
export class PathInGroupNegatedToken extends PathGroupToken {
	readonly path:undefined | PathInNegatedToken | PathAlternativeToken<PathInNegatedToken>;

	constructor( path:undefined | PathInNegatedToken | PathAlternativeToken<PathInNegatedToken> ) {
		super( path );
	}
}

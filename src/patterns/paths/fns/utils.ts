import { IRIToken } from "../../../tokens/IRIToken";
import { PathInNegatedToken } from "../../../tokens/PathInNegatedToken";
import { PathToken } from "../../../tokens/PathToken";
import { SharedSubPathToken } from "../../../tokens/SharedSubPathToken";


/**
 * Create a function that will wrap into a sub-path any token
 * matched by the symbols provided.
 *
 * The match is calculated comparing a symbol provided with the
 * {@link TokenNode.token} property.
 *
 * @param symbols The name of the tokens to be wrapped.
 */
export function _getTokenWrapper<T extends PathToken>( ...symbols:string[] ):( token:PathToken ) => T {
	return ( token:PathToken ):any => {
		if( token === "a" ) return token;

		if( symbols.indexOf( token.token ) !== -1 )
			return new SharedSubPathToken( token );

		return token;
	}
}


/**
 * Verify the token provided is a base token primitive.
 * i.e. if the token is `"a"` or a {@link IRIToken}.
 *
 * @param token the token to be verified.
 *
 */
export function _isBasePrimitive( token:PathToken ):token is IRIToken | "a" {
	return token === "a"
		|| token.token === "iri"
		|| token.token === "prefixedName"
		;
}

/**
 * Verify is the token provided is a {@link PathInNegatedToken}.
 *
 * @param token The token to be verified.
 */
export function _isPathInNegatedToken( token:PathToken ):token is PathInNegatedToken {
	return _isBasePrimitive( token )
		|| (
			token.token === "pathInverse"
			&& _isBasePrimitive( token.path )
		);
}

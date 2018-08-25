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
 *
 * @private
 */
export function _getTokenWrapper<T extends PathToken>( ...symbols:string[] ):( token:PathToken ) => T {
	return ( token:PathToken ):any => {
		if( token === "a" ) return token;

		if( symbols.indexOf( token.token ) !== - 1 )
			return new SharedSubPathToken( token );

		return token;
	}
}
import { isPrefixed } from "../core/iri/utils";
import { IRIRefToken } from "./IRIRefToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { TokenNode } from "./TokenNode";


/**
 * Alias for any IRI token.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#riri}
 */
export type IRIToken = IRIRefToken | PrefixedNameToken;


/**
 * Constant with the utils for {@link IRIToken} objects.
 */
export const IRIToken:{
	/**
	 * Return true if the {@param token} is a valid {@link IRIToken}.
	 *
	 * @param token Token to be checked.
	 */
	is( token:TokenNode ):token is IRIToken;

	/**
	 * Returns the respective token from the IRI string.
	 *
	 * @param iri The IRI string to be converted into a token.
	 */
	create( iri:string ):IRIToken;
} = {
	is( token:TokenNode ):token is IRIToken {
		return token.token === "iri" ||
			token.token === "prefixedName";
	},

	create( iri:string ):IRIToken {
		if( isPrefixed( iri ) ) return new PrefixedNameToken( iri );
		return new IRIRefToken( iri );
	},
};

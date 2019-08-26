import { isPrefixed } from "../core/iri/utils";
import { IRIRefToken } from "./IRIRefToken";
import { PrefixedNameToken } from "./PrefixedNameToken";


/**
 * Alias for any IRI token.
 *
 * @see {@link https://www.w3.org/TR/sparql11-query/#riri}
 */
export type IRIToken = IRIRefToken | PrefixedNameToken;


/**
 * Returns the respective token from the IRI string.
 *
 * @param iri The IRI string to be converted into a token.
 */
export function getIRIToken( iri:string ):IRIToken {
	if( isPrefixed( iri ) ) return new PrefixedNameToken( iri );
	return new IRIRefToken( iri );
}

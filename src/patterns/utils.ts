import { getIRIToken } from "../tokens/IRIToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { ObjectToken } from "../tokens/ObjectToken";
import { RDFLiteralToken } from "../tokens/RDFLiteralToken";
import { TermToken } from "../tokens/TermToken";
import { VariableToken } from "../tokens/VariableToken";

import { XSD } from "../utils/XSD";

import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TripleSubject } from "./triplePatterns/TripleSubject";


export function convertValue( value:"UNDEF" ):"UNDEF";
export function convertValue<T extends TripleSubject<X>, X extends ObjectToken>( value:T ):X;
export function convertValue<T extends SupportedNativeTypes>( value:T ):LiteralToken;
export function convertValue( value:SupportedNativeTypes | TripleSubject<VariableToken | TermToken> ):ObjectToken | "UNDEF" {
	if( value instanceof Date )
		return new RDFLiteralToken( value.toISOString(), getIRIToken( XSD.dateTime ) );

	if( typeof value === "object" )
		return value.getSubject();

	if( typeof value === "string" ) {
		if( value === "UNDEF" ) return value;
		return new LiteralToken( value );
	}

	return new LiteralToken( value );
}

import { LiteralToken } from "../tokens/LiteralToken";
import { TermToken } from "../tokens/TermToken";
import { VariableToken } from "../tokens/VariableToken";

import * as XSD from "../utils/XSD";

import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePattern } from "./TriplePattern";


export function convertValue( value:"UNDEF" ):"UNDEF";
export function convertValue<T extends TriplePattern<any> | SupportedNativeTypes>( value:T ):T extends TriplePattern<infer TOKEN> ? TOKEN : LiteralToken;
export function convertValue( value:SupportedNativeTypes | TriplePattern<VariableToken | TermToken> ):VariableToken | TermToken | "UNDEF" {
	if( value instanceof Date )
		return new LiteralToken( value.toISOString() )
			.setType( XSD.dateTime );

	if( typeof value === "object" )
		return value.getSubject();

	if( typeof value === "string" ) {
		if( value === "UNDEF" ) return value;
		return new LiteralToken( value );
	}

	return new LiteralToken( value );
}
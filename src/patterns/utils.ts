import { Container } from "../data/Container";
import { isAbsolute } from "../iri/utils";
import { getIRIToken, IRIToken } from "../tokens/IRIToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { ObjectToken } from "../tokens/ObjectToken";
import { RDFLiteralToken } from "../tokens/RDFLiteralToken";
import { TermToken } from "../tokens/TermToken";
import { TokenNode } from "../tokens/TokenNode";
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


const _is = <T>( value:unknown, property:PropertyKey ):value is T =>
	typeof value === "object" && !!value && property in value;

export const _getTransformer =
	<Wrapper extends { [P in keyof Wrapper]:() => TokenNode | IRIToken | LiteralToken }>
	( property:keyof Wrapper ) => {
		type Token = ReturnType<Wrapper[typeof property]>;
		type ReturnTokens = Token | IRIToken | LiteralToken;

		return ( container:Container<any> ) =>
			( value:Wrapper | Token | SupportedNativeTypes ):ReturnTokens => _is<Wrapper>( value, property )
				? value[ property ]() as Token
				: _is<Token>( value, "token" )
					? value
					: typeof value === "string" && isAbsolute( value )
						? container.iriResolver.resolve( value )
						: convertValue( value )
	};

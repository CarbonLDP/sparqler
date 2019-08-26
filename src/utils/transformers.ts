import { Container } from "../data/Container";

import { isAbsolute } from "../iri/utils";

import { TripleSubject } from "../patterns/triplePatterns/TripleSubject";

import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { getIRIToken } from "../tokens/IRIToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { ObjectToken } from "../tokens/ObjectToken";
import { RDFLiteralToken } from "../tokens/RDFLiteralToken";
import { TermToken } from "../tokens/TermToken";
import { TokenNode } from "../tokens/TokenNode";
import { VariableToken } from "../tokens/VariableToken";

import { XSD } from "./XSD";


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


const _is = <T>( value:unknown, property:string ):value is T =>
	typeof value === "object" && !!value && property in value;


export type Transformer<W, T extends TokenNode> = ( value:W ) => T;


export const _getBaseTransformer =
	<K extends string, Wrapper extends { [P in K]:() => TokenNode }>
	( property:K ) => {
		return <RestTransformer extends Transformer<SupportedNativeTypes, TokenNode>>( restTransformer:RestTransformer ) =>
			( value:Wrapper | ReturnType<Wrapper[K]> | SupportedNativeTypes ) => _is<Wrapper>( value, property )
				? value[ property ]() as ReturnType<Wrapper[K]>
				: _is<ReturnType<Wrapper[K]>>( value, "token" )
					? value
					: restTransformer( value ) as ReturnType<RestTransformer>;
	}
;


export const _getTransformer =
	<K extends string, Wrapper extends { [P in K]:() => TokenNode }>
	( property:K ) =>
		( container:Container<any> ) =>
			_getBaseTransformer<K, Wrapper>
			( property )( value =>
				typeof value === "string" && isAbsolute( value )
					? container.iriResolver.resolve( value )
					: convertValue( value )
			);

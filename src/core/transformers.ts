import { SupportedNativeTypes } from "../SupportedNativeTypes";

import { getIRIToken } from "../tokens/IRIToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { RDFLiteralToken } from "../tokens/RDFLiteralToken";
import { TokenNode } from "../tokens/TokenNode";

import { XSD } from "../vocabularies/XSD";


export const _transformNatives = ( value:SupportedNativeTypes ) =>
	value instanceof Date
		? new RDFLiteralToken( value.toISOString(), getIRIToken( XSD.dateTime ) )
		: new LiteralToken( value )
;


export type Transformer<W, T extends TokenNode | string> = ( value:W ) => T;


const _is = <T>( value:unknown, property:string ):value is T =>
	typeof value === "object" && !!value && property in value;

export const _getBaseTransformer =
	<K extends string, Wrapper extends { [P in K]:() => TokenNode }>
	( property:K ) => {
		return <NativeTransformer extends Transformer<SupportedNativeTypes, any>>( nativeTransformer:NativeTransformer ) =>
			( value:Wrapper | ReturnType<Wrapper[K]> | SupportedNativeTypes ) => _is<Wrapper>( value, property )
				? value[ property ]() as ReturnType<Wrapper[K]>
				: _is<ReturnType<Wrapper[K]>>( value, "token" )
					? value
					: nativeTransformer( value ) as ReturnType<NativeTransformer>;
	}
;

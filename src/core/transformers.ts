import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";

import { IRIRefToken } from "../tokens/IRIRefToken";
import { LiteralToken } from "../tokens/LiteralToken";
import { RDFLiteralToken } from "../tokens/RDFLiteralToken";
import { TokenNode } from "../tokens/TokenNode";

import { XSD } from "../utils/XSD";


export const _transformNatives = ( value:SupportedNativeTypes ) =>
	value instanceof Date
		? new RDFLiteralToken( value.toISOString(), new IRIRefToken( XSD.dateTime ) )
		: new LiteralToken( value )
;


export type Transformer<W, T extends TokenNode | string> = ( value:W ) => T;


export const _is = <T extends {}>( value:unknown, property:keyof T ):value is T =>
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

import { Container } from "../../data/Container";
import { isAbsolute } from "../../iri/utils";
import { IRIToken } from "../../tokens/IRIToken";
import { LiteralToken } from "../../tokens/LiteralToken";
import { TokenNode } from "../../tokens/TokenNode";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { convertValue } from "../utils";


const _is = <T>( value:unknown, property:PropertyKey ):value is T =>
	typeof value === "object" && !!value && property in value;

export const __getTransformer =
	<T extends string, W extends { [P in T]:() => V }, V extends TokenNode | IRIToken | LiteralToken>
	( property:T, container:Container<any> ) =>
		( value:W | V | SupportedNativeTypes ):V | IRIToken | LiteralToken => _is<W>( value, property )
			? value[ property ]()
			: _is<V>( value, "token" )
				? value
				: typeof value === "string" && isAbsolute( value )
					? container.iriResolver.resolve( value )
					: convertValue( value )
;


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

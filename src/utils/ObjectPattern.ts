import {
	SupportedNativeTypes,
	ElementPattern
} from "../patterns/interfaces";
import * as XSD from "./XSD";
import { Token } from "../tokens/Token";
import { StringLiteral } from "../tokens/StringLiteral";
import {
	OPEN_QUOTE,
	CLOSE_QUOTE,
	CLOSE_IRI,
	OPEN_IRI,
	OFF_TYPE,
	UNDEF
} from "../patterns/tokens";
import { PatternBuilder } from "../patterns/PatternBuilder";

export function serialize( object:SupportedNativeTypes | ElementPattern ):Token[];
export function serialize( object ):Token[] {

	if( typeof object === "string" || object instanceof String ) {
		if( object === PatternBuilder.undefined ) return [ UNDEF ];
		return [ OPEN_QUOTE, new StringLiteral( object as string ), CLOSE_QUOTE ];
	}

	if( typeof object === "number" || object instanceof Number ) {
		if( Number.isInteger( object.valueOf() ) )
			return this.addType( object + "", "integer" );
		return this.addType( object + "", "float" );
	}

	if( typeof object === "boolean" || object instanceof Boolean )
		return this.addType( object + "", "boolean" );

	if( object instanceof Date )
		return this.addType( object.toISOString(), "dateTime" );

	return object.getSelfTokens();
}

export function addType( value:string, type:string ):Token[] {
	if( type in XSD ) type = XSD[ type ];
	return [ OPEN_QUOTE, new StringLiteral( value ), CLOSE_QUOTE, OFF_TYPE, OPEN_IRI, new StringLiteral( type ), CLOSE_IRI ];
}

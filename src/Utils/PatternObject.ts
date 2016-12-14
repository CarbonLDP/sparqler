import {
	supportedNativeTypes,
	ElementPattern
} from "../Patterns";
import * as XSD from "./XSD";
import { Token } from "../Tokens/Token";
import { StringLiteral } from "../Tokens/StringLiteral";
import {
	OPEN_QUOTE,
	CLOSE_QUOTE,
	CLOSE_IRI,
	OPEN_IRI,
	OFF_TYPE
} from "../Tokens";

export function serialize( object:supportedNativeTypes ):Token[];
export function serialize( object:ElementPattern ):Token[];
export function serialize( object ):Token[] {

	if( typeof object === "string" || object instanceof String )
		return [ OPEN_QUOTE, new StringLiteral( object as string ), CLOSE_QUOTE ];

	if( typeof object === "number" || object instanceof Number ) {
		if( Number.isInteger( object.valueOf() ) )
			return addType( object + "", "integer" );
		return addType( object + "", "float" );
	}

	if( typeof object === "boolean" || object instanceof Boolean )
		return addType( object + "", "boolean" );

	if( object instanceof Date )
		return addType( object.toISOString(), "dateTime" );

	return object.getSelfTokens();
}

export function addType( value:string, type:string ):Token[] {
	if( type in XSD ) type = XSD[ type ];
	return [ OPEN_QUOTE, new StringLiteral( value ), CLOSE_QUOTE, OFF_TYPE, OPEN_IRI, new StringLiteral( type ), CLOSE_IRI ];
}


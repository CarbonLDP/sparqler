import { supportedNativeTypes } from "../Patterns";
import * as XSD from "./XSD";

export function serialize( object:supportedNativeTypes ):string;
export function serialize( object:Object ):string;
export function serialize( object ):string {

	if( typeof object === "string" || object instanceof String )
		return `"${ object }"`;

	if( typeof object === "number" || object instanceof Number ) {
		if( Number.isInteger( object.valueOf() ) )
			return addType( `"${ object }"`, "integer" );
		return addType( `"${ object }"`, "float" );
	}

	if( typeof object === "boolean" || object instanceof Boolean )
		return addType( `"${ object }"`, "boolean" );

	if( object instanceof Date )
		return addType( `"${ object.toISOString() }"`, "dateTime" );

	return object + "";
}

export function addType( value:string, type:string ):string {
	if( type in XSD ) type = XSD[ type ];
	return `${ value }^^<${ type }>`;
}


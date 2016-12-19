import {
	Token,
	EMPTY_SEPARATOR,
	NEW_LINE_SEPARATOR,
	SPACE_SEPARATOR,
} from "./Token";

export class NewLineSymbol extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		if( nextToken instanceof NewLineSymbol ) {
			if( [ ".", ";", "," ].indexOf( nextToken[ "value" ] ) !== - 1 )
				return SPACE_SEPARATOR;
		}

		return NEW_LINE_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

}

export default NewLineSymbol;

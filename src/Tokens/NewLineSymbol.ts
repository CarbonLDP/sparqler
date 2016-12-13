import {
	Token,
	TokenFormat,
	EMPTY_SEPARATOR,
	NEW_LINE_SEPARATOR,
	addIndentation,
	removeIndentation,
} from "./Token";

export class NewLineSymbol extends Token {

	getTokenValue( format:TokenFormat, nextToken?:Token ):string {
		if( this.value === "{" ) {
			addIndentation();
		}
		if( ! ! nextToken && nextToken[ "value" ] === "}" ) {
			removeIndentation();
		}

		return super.getTokenValue( format, nextToken );
	}

	protected getPrettySeparator( nextToken:Token ):string {
		return NEW_LINE_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

}

export default NewLineSymbol;

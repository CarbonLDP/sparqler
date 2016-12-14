import {
	Token,
	EMPTY_SEPARATOR,
	SPACE_SEPARATOR,
	NEW_LINE_SEPARATOR,
	removeIndentation,
} from "./Token";
import { Identifier } from "./Identifier";
import { Operator } from "./Operator";
import { NewLineSymbol } from "./NewLineSymbol";

export class RightSymbol extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		if( nextToken instanceof Identifier )
			return NEW_LINE_SEPARATOR;

		if( nextToken instanceof NewLineSymbol ) {
			if( [ "}", "]", ")" ].indexOf( nextToken[ "value" ] ) !== - 1 ) {
				removeIndentation();
				return NEW_LINE_SEPARATOR;
			}
		}

		if( nextToken instanceof Operator )
			return EMPTY_SEPARATOR;

		return SPACE_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

}

export default RightSymbol;

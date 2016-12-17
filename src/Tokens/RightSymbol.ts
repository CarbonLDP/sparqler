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
import { LeftSymbol } from "./LeftSymbol";

export class RightSymbol extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		if( nextToken instanceof Identifier && nextToken[ "value" ] !== "UNDEF" )
			return NEW_LINE_SEPARATOR;

		if( nextToken instanceof NewLineSymbol ) {
			if( [ "}", "]", ")" ].indexOf( nextToken[ "value" ] ) !== - 1 ) {
				removeIndentation();
				return NEW_LINE_SEPARATOR;
			}
		}

		if( nextToken instanceof LeftSymbol ) {
			if( nextToken[ "value" ] === "(" )
				return NEW_LINE_SEPARATOR;
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

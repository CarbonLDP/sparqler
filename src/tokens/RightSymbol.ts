import { Identifier } from "./Identifier";
import { LeftSymbol } from "./LeftSymbol";
import { NewLineSymbol } from "./NewLineSymbol";
import { Operator } from "./Operator";
import {
	EMPTY_SEPARATOR,
	NEW_LINE_SEPARATOR,
	SPACE_SEPARATOR,
	Token,
} from "./Token";

export class RightSymbol extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		if( nextToken instanceof Identifier && nextToken[ "value" ] !== "UNDEF" )
			return NEW_LINE_SEPARATOR;

		if( nextToken instanceof NewLineSymbol ) {
			if( [ "}", "]", ")" ].indexOf( nextToken[ "value" ] ) !== - 1 ) {
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

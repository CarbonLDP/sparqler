import {
	Token,
	SPACE_SEPARATOR,
	EMPTY_SEPARATOR,
	NEW_LINE_SEPARATOR,
} from "./Token";
import { Identifier } from "./Identifier";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";
import { NewLineSymbol } from "./NewLineSymbol";

export class StringLiteral extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		if( ( nextToken instanceof Identifier && nextToken[ "value" ] !== "AS" ) || ( nextToken instanceof NewLineSymbol && nextToken[ "value" ] === ")" ) )
			return NEW_LINE_SEPARATOR;

		if( nextToken instanceof Operator || ( nextToken instanceof RightSymbol && nextToken[ "value" ] !== ")" ) )
			return EMPTY_SEPARATOR;

		return SPACE_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		if( this.constructor === nextToken.constructor || nextToken instanceof Identifier )
			return SPACE_SEPARATOR;

		return EMPTY_SEPARATOR;
	}

}

export default StringLiteral;

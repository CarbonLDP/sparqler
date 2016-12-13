import {
	Token,
	SPACE_SEPARATOR,
	EMPTY_SEPARATOR,
	NEW_LINE_SEPARATOR,
} from "./Token";
import { Identifier } from "./Identifier";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";

export class NumberLiteral extends Token {

	constructor( value:number ) {
		super( value + "" );
	}

	protected getPrettySeparator( nextToken:Token ):string {
		if( nextToken instanceof Identifier )
			return NEW_LINE_SEPARATOR;

		if( nextToken instanceof Operator || nextToken instanceof RightSymbol )
			return EMPTY_SEPARATOR;

		return SPACE_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		if( this.constructor === nextToken.constructor )
			return SPACE_SEPARATOR;

		return EMPTY_SEPARATOR;
	}

}

export default NumberLiteral;

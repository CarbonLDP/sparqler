import {
	Token,
	SPACE_SEPARATOR,
	EMPTY_SEPARATOR,
} from "./Token";
import { StringLiteral } from "./StringLiteral";

export class Identifier extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		return SPACE_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		if( this.constructor === nextToken.constructor || nextToken instanceof StringLiteral )
			return SPACE_SEPARATOR;

		return EMPTY_SEPARATOR;
	}

}

export default Identifier;

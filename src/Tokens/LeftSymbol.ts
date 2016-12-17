import {
	Token,
	EMPTY_SEPARATOR,
	SPACE_SEPARATOR,
} from "./Token";
import { Identifier } from "./Identifier";

export class LeftSymbol extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		if( nextToken instanceof LeftSymbol || nextToken instanceof Identifier )
			return SPACE_SEPARATOR;
		return EMPTY_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

}

export default LeftSymbol;

import { Identifier } from "./Identifier";
import {
	EMPTY_SEPARATOR,
	SPACE_SEPARATOR,
	Token,
} from "./Token";

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

import {
	Token,
	EMPTY_SEPARATOR,
} from "./Token";

export class LeftSymbol extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

}

export default LeftSymbol;

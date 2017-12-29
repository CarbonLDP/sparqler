import {
	EMPTY_SEPARATOR,
	Token,
} from "./Token";

export class Operator extends Token {

	protected getPrettySeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

	protected getCompactSeparator( nextToken:Token ):string {
		return EMPTY_SEPARATOR;
	}

}

export default Operator;

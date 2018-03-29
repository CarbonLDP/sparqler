import { Identifier } from "./Identifier";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
export class NumberLiteral extends Token {
    constructor(value) {
        super(value + "");
    }
    getPrettySeparator(nextToken) {
        if (nextToken instanceof Identifier)
            return NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator || nextToken instanceof RightSymbol)
            return EMPTY_SEPARATOR;
        return SPACE_SEPARATOR;
    }
    getCompactSeparator(nextToken) {
        if (this.constructor === nextToken.constructor)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    }
}
export default NumberLiteral;

//# sourceMappingURL=NumberLiteral.js.map

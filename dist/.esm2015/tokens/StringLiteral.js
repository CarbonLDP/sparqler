import { Identifier } from "./Identifier";
import { NewLineSymbol } from "./NewLineSymbol";
import { Operator } from "./Operator";
import { RightSymbol } from "./RightSymbol";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
export class StringLiteral extends Token {
    getPrettySeparator(nextToken) {
        if ((nextToken instanceof Identifier && nextToken["value"] !== "AS") || (nextToken instanceof NewLineSymbol && (nextToken["value"] === ")" || nextToken["value"] === "}")))
            return NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator || (nextToken instanceof RightSymbol && nextToken["value"] !== ")"))
            return EMPTY_SEPARATOR;
        return SPACE_SEPARATOR;
    }
    getCompactSeparator(nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof Identifier)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    }
}
export default StringLiteral;

//# sourceMappingURL=StringLiteral.js.map

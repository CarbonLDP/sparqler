import { Identifier } from "./Identifier";
import { EMPTY_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
export class LeftSymbol extends Token {
    getPrettySeparator(nextToken) {
        if (nextToken instanceof LeftSymbol || nextToken instanceof Identifier)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    }
    getCompactSeparator(nextToken) {
        return EMPTY_SEPARATOR;
    }
}
export default LeftSymbol;

//# sourceMappingURL=LeftSymbol.js.map

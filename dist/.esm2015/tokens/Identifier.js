import { StringLiteral } from "./StringLiteral";
import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
export class Identifier extends Token {
    getPrettySeparator(nextToken) {
        if (this.value === "UNION")
            return NEW_LINE_SEPARATOR;
        return SPACE_SEPARATOR;
    }
    getCompactSeparator(nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof StringLiteral)
            return SPACE_SEPARATOR;
        return EMPTY_SEPARATOR;
    }
}
export default Identifier;

//# sourceMappingURL=Identifier.js.map

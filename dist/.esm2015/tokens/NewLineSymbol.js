import { EMPTY_SEPARATOR, NEW_LINE_SEPARATOR, SPACE_SEPARATOR, Token, } from "./Token";
export class NewLineSymbol extends Token {
    getPrettySeparator(nextToken) {
        if (nextToken instanceof NewLineSymbol) {
            if ([".", ";", ","].indexOf(nextToken["value"]) !== -1)
                return SPACE_SEPARATOR;
        }
        return NEW_LINE_SEPARATOR;
    }
    getCompactSeparator(nextToken) {
        return EMPTY_SEPARATOR;
    }
}
export default NewLineSymbol;

//# sourceMappingURL=NewLineSymbol.js.map

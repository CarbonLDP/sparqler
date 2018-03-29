export const EMPTY_SEPARATOR = "";
export const SPACE_SEPARATOR = " ";
export const NEW_LINE_SEPARATOR = "\n";
export var TokenFormat;
(function (TokenFormat) {
    TokenFormat[TokenFormat["PRETTY"] = 0] = "PRETTY";
    TokenFormat[TokenFormat["COMPACT"] = 1] = "COMPACT";
})(TokenFormat || (TokenFormat = {}));
export class Token {
    constructor(value) {
        this.value = value;
    }
    ;
    getTokenValue(format, nextToken) {
        let separator = EMPTY_SEPARATOR;
        if (nextToken !== void 0) {
            switch (format) {
                case TokenFormat.PRETTY:
                    separator = this.getPrettySeparator(nextToken);
                    break;
                case TokenFormat.COMPACT:
                    separator = this.getCompactSeparator(nextToken);
                    break;
            }
        }
        return this.value + separator;
    }
}
export default Token;

//# sourceMappingURL=Token.js.map

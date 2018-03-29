export var EMPTY_SEPARATOR = "";
export var SPACE_SEPARATOR = " ";
export var NEW_LINE_SEPARATOR = "\n";
export var TokenFormat;
(function (TokenFormat) {
    TokenFormat[TokenFormat["PRETTY"] = 0] = "PRETTY";
    TokenFormat[TokenFormat["COMPACT"] = 1] = "COMPACT";
})(TokenFormat || (TokenFormat = {}));
var Token = (function () {
    function Token(value) {
        this.value = value;
    }
    ;
    Token.prototype.getTokenValue = function (format, nextToken) {
        var separator = EMPTY_SEPARATOR;
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
    };
    return Token;
}());
export { Token };
export default Token;

//# sourceMappingURL=Token.js.map

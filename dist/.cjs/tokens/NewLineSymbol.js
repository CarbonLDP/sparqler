"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Token_1 = require("./Token");
var NewLineSymbol = (function (_super) {
    tslib_1.__extends(NewLineSymbol, _super);
    function NewLineSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewLineSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof NewLineSymbol) {
            if ([".", ";", ","].indexOf(nextToken["value"]) !== -1)
                return Token_1.SPACE_SEPARATOR;
        }
        return Token_1.NEW_LINE_SEPARATOR;
    };
    NewLineSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return NewLineSymbol;
}(Token_1.Token));
exports.NewLineSymbol = NewLineSymbol;
exports.default = NewLineSymbol;

//# sourceMappingURL=NewLineSymbol.js.map

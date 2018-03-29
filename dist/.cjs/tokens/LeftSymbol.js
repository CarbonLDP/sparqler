"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Identifier_1 = require("./Identifier");
var Token_1 = require("./Token");
var LeftSymbol = (function (_super) {
    tslib_1.__extends(LeftSymbol, _super);
    function LeftSymbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof LeftSymbol || nextToken instanceof Identifier_1.Identifier)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    LeftSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return LeftSymbol;
}(Token_1.Token));
exports.LeftSymbol = LeftSymbol;
exports.default = LeftSymbol;

//# sourceMappingURL=LeftSymbol.js.map

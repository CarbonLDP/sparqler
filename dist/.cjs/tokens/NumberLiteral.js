"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Identifier_1 = require("./Identifier");
var Operator_1 = require("./Operator");
var RightSymbol_1 = require("./RightSymbol");
var Token_1 = require("./Token");
var NumberLiteral = (function (_super) {
    tslib_1.__extends(NumberLiteral, _super);
    function NumberLiteral(value) {
        return _super.call(this, value + "") || this;
    }
    NumberLiteral.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier)
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator_1.Operator || nextToken instanceof RightSymbol_1.RightSymbol)
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    NumberLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return NumberLiteral;
}(Token_1.Token));
exports.NumberLiteral = NumberLiteral;
exports.default = NumberLiteral;

//# sourceMappingURL=NumberLiteral.js.map

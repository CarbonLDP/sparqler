"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = require("./Token");
var Identifier_1 = require("./Identifier");
var Operator_1 = require("./Operator");
var NewLineSymbol_1 = require("./NewLineSymbol");
var LeftSymbol_1 = require("./LeftSymbol");
var RightSymbol = (function (_super) {
    __extends(RightSymbol, _super);
    function RightSymbol() {
        return _super.apply(this, arguments) || this;
    }
    RightSymbol.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier && nextToken["value"] !== "UNDEF")
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof NewLineSymbol_1.NewLineSymbol) {
            if (["}", "]", ")"].indexOf(nextToken["value"]) !== -1) {
                return Token_1.NEW_LINE_SEPARATOR;
            }
        }
        if (nextToken instanceof LeftSymbol_1.LeftSymbol) {
            if (nextToken["value"] === "(")
                return Token_1.NEW_LINE_SEPARATOR;
        }
        if (nextToken instanceof Operator_1.Operator)
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    RightSymbol.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return RightSymbol;
}(Token_1.Token));
exports.RightSymbol = RightSymbol;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RightSymbol;

//# sourceMappingURL=RightSymbol.js.map

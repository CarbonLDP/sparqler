"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = require("./Token");
var Identifier_1 = require("./Identifier");
var Operator_1 = require("./Operator");
var RightSymbol_1 = require("./RightSymbol");
var NewLineSymbol_1 = require("./NewLineSymbol");
var StringLiteral = (function (_super) {
    __extends(StringLiteral, _super);
    function StringLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringLiteral.prototype.getPrettySeparator = function (nextToken) {
        if (nextToken instanceof Identifier_1.Identifier || (nextToken instanceof NewLineSymbol_1.NewLineSymbol && nextToken["value"] === ")"))
            return Token_1.NEW_LINE_SEPARATOR;
        if (nextToken instanceof Operator_1.Operator || (nextToken instanceof RightSymbol_1.RightSymbol && nextToken["value"] !== ")"))
            return Token_1.EMPTY_SEPARATOR;
        return Token_1.SPACE_SEPARATOR;
    };
    StringLiteral.prototype.getCompactSeparator = function (nextToken) {
        if (this.constructor === nextToken.constructor || nextToken instanceof Identifier_1.Identifier)
            return Token_1.SPACE_SEPARATOR;
        return Token_1.EMPTY_SEPARATOR;
    };
    return StringLiteral;
}(Token_1.Token));
exports.StringLiteral = StringLiteral;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StringLiteral;

//# sourceMappingURL=StringLiteral.js.map

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Token_1 = require("./Token");
var Operator = (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Operator.prototype.getPrettySeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    Operator.prototype.getCompactSeparator = function (nextToken) {
        return Token_1.EMPTY_SEPARATOR;
    };
    return Operator;
}(Token_1.Token));
exports.Operator = Operator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Operator;

//# sourceMappingURL=Operator.js.map

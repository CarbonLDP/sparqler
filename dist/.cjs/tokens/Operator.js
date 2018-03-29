"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Token_1 = require("./Token");
var Operator = (function (_super) {
    tslib_1.__extends(Operator, _super);
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
exports.default = Operator;

//# sourceMappingURL=Operator.js.map

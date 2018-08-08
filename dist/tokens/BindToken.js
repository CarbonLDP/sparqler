"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BindToken = (function () {
    function BindToken(expression, variable) {
        this.token = "bind";
        this.expression = expression;
        this.variable = variable;
    }
    BindToken.prototype.toString = function (spaces) {
        return "BIND(" + this.expression + " AS " + this.variable + ")";
    };
    return BindToken;
}());
exports.BindToken = BindToken;

//# sourceMappingURL=BindToken.js.map

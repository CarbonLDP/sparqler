"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValuesToken = (function () {
    function ValuesToken() {
        this.token = "values";
        this.variables = [];
        this.values = [];
    }
    ValuesToken.prototype.addValues = function (variable) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.variables.push(variable);
        this.values.push(values);
        return this;
    };
    ValuesToken.prototype.toString = function () {
        var variables = this.variables.length ? this.variables.length === 1 ? this.variables.join(" ") :
            "( " + this.variables.join(" ") + " )" : "()";
        var values = this.variables.length ? this.variables.length === 1 ? this.values[0] :
            this.values.map(function (values) { return "( " + values.join(" ") + " )"; }) : ["()"];
        return "VALUES " + variables + " { " + values.join(" ") + " }";
    };
    return ValuesToken;
}());
exports.ValuesToken = ValuesToken;

//# sourceMappingURL=ValuesToken.js.map

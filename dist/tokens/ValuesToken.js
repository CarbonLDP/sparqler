"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
var ValuesToken = (function () {
    function ValuesToken() {
        this.token = "values";
        this.variables = [];
        this.values = [];
    }
    ValuesToken.prototype.addVariables = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        (_a = this.variables).push.apply(_a, variables);
        return this;
    };
    ValuesToken.prototype.addValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values.push(values);
        return this;
    };
    ValuesToken.prototype.toString = function (spaces) {
        var variables = this._getVariablesStr();
        var values = this._getValuesStr(spaces);
        return "VALUES " + variables + " " + values;
    };
    ValuesToken.prototype._getVariablesStr = function () {
        if (!this.variables.length)
            return "()";
        var variables = this.variables.join(" ");
        if (this.variables.length === 1)
            return variables;
        return "( " + variables + " )";
    };
    ValuesToken.prototype._getValuesStr = function (spaces) {
        if (!this.values.length)
            return "{}";
        if (this.variables.length === 1) {
            var values = this.values
                .filter(function (x) { return x.length; })
                .map(function (x) { return x[0]; })
                .join(" ");
            if (!values)
                return "{}";
            return "{ " + values + " }";
        }
        var subIndent = printing_1.getIndentation(spaces, printing_1.INDENTATION_SPACES);
        var separator = printing_1.getSeparator(spaces);
        var indent = printing_1.getIndentation(spaces);
        return "{" + separator +
            this.values
                .map(function (values) {
                var valuesStr = values.length ?
                    "( " + values.join(" ") + " )" : "()";
                return subIndent + valuesStr;
            })
                .join(separator) + separator +
            indent + "}";
    };
    return ValuesToken;
}());
exports.ValuesToken = ValuesToken;

//# sourceMappingURL=ValuesToken.js.map

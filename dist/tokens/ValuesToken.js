"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printing_1 = require("./printing");
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
            return "{ () }";
        if (this.values.length === 1) {
            var values = this.values[0].length ?
                this.values[0].join(" ") :
                "()";
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

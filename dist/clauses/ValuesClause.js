"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patterns_1 = require("./../patterns");
var tokens_1 = require("./../tokens");
var IRIResolver2_1 = require("../iri/IRIResolver2");
var ObjectPattern_1 = require("../utils/ObjectPattern");
var utils_1 = require("./utils");
function _normalizeVariables(variableOrVariables) {
    if (Array.isArray(variableOrVariables))
        return variableOrVariables.map(function (x) { return new tokens_1.VariableToken(x); });
    return [new tokens_1.VariableToken(variableOrVariables)];
}
function _normalizeRawValues(valuesOrBuilder, iriResolver) {
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(new patterns_1.PatternBuilder(iriResolver)) :
        valuesOrBuilder;
    if (!Array.isArray(rawValues))
        return [[rawValues]];
    return rawValues.map(function (rawValue) {
        if (Array.isArray(rawValue))
            return rawValue;
        return [rawValue];
    });
}
function createValuesFn(genericFactory, container) {
    return function (variableOrVariables, valuesOrBuilder) {
        var iriResolver = new IRIResolver2_1.IRIResolver2(container.iriResolver);
        var values = _normalizeRawValues(valuesOrBuilder, iriResolver);
        var variables = _normalizeVariables(variableOrVariables);
        var token = new tokens_1.ValuesToken();
        values.forEach(function (valuesRow, index) {
            token.addValues.apply(token, [variables[index]].concat(valuesRow.map(ObjectPattern_1.convertValue)));
        });
        var targetToken = utils_1.cloneElement(container.targetToken, { values: token });
        var newContainer = utils_1.cloneElement(container, { iriResolver: iriResolver, targetToken: targetToken });
        return genericFactory(newContainer, {});
    };
}
exports.ValuesClause = {
    create: function (genericFactory, container, object) {
        return Object.assign(object, {
            values: createValuesFn(genericFactory, container),
        });
    },
};

//# sourceMappingURL=ValuesClause.js.map

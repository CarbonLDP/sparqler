"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver_1 = require("../data/IRIResolver");
var utils_1 = require("../data/utils");
var PatternBuilder_1 = require("../patterns/PatternBuilder");
var utils_2 = require("../patterns/utils");
var ValuesToken_1 = require("../tokens/ValuesToken");
var VariableToken_1 = require("../tokens/VariableToken");
function _normalizeVariables(variableOrVariables) {
    var variables = Array.isArray(variableOrVariables) ? variableOrVariables : [variableOrVariables];
    return variables.map(function (x) { return new VariableToken_1.VariableToken(x); });
}
function _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle) {
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(PatternBuilder_1.PatternBuilder.create(iriResolver)) :
        valuesOrBuilder;
    if (!Array.isArray(rawValues))
        return [[rawValues]];
    if (isSingle)
        rawValues.map(function (value) { return [value]; });
    if (rawValues.some(Array.isArray))
        return rawValues;
    return [rawValues];
}
function createValuesFn(genericFactory, container) {
    return function (variableOrVariables, valuesOrBuilder) {
        var token = new ValuesToken_1.ValuesToken();
        var variables = _normalizeVariables(variableOrVariables);
        token.addVariables.apply(token, variables);
        var isSingle = !Array.isArray(variableOrVariables);
        var iriResolver = new IRIResolver_1.IRIResolver(container.iriResolver);
        var values = _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle);
        values.forEach(function (valuesRow) { return token.addValues.apply(token, valuesRow.map(utils_2.convertValue)); });
        var targetToken = utils_1.cloneElement(container.targetToken, { values: token });
        var newContainer = utils_1.cloneElement(container, { iriResolver: iriResolver, targetToken: targetToken });
        return genericFactory(newContainer, {});
    };
}
exports.ValuesClause = {
    createFrom: function (genericFactory, container, object) {
        return Object.assign(object, {
            values: createValuesFn(genericFactory, container),
        });
    },
};

//# sourceMappingURL=ValuesClause.js.map

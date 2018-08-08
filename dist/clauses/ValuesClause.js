"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver2_1 = require("../data/IRIResolver2");
var utils_1 = require("../data/utils");
var PatternBuilder2_1 = require("../patterns/PatternBuilder2");
var utils_2 = require("../patterns/utils");
var ValuesToken_1 = require("../tokens/ValuesToken");
var VariableToken_1 = require("../tokens/VariableToken");
function _normalizeVariables(variableOrVariables) {
    var variables = Array.isArray(variableOrVariables) ? variableOrVariables : [variableOrVariables];
    return variables.map(function (x) {
        if (typeof x === "string")
            return new VariableToken_1.VariableToken(x);
        return x.getSubject();
    });
}
function _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle) {
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(PatternBuilder2_1.PatternBuilder2.create(iriResolver)) :
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
        var iriResolver = new IRIResolver2_1.IRIResolver2(container.iriResolver);
        var isSingle = !Array.isArray(variableOrVariables);
        var values = _normalizeRawValues(valuesOrBuilder, iriResolver, isSingle);
        var variables = _normalizeVariables(variableOrVariables);
        var token = new ValuesToken_1.ValuesToken();
        values.forEach(function (valuesRow, index) {
            token.addValues.apply(token, [variables[index]].concat(valuesRow.map(utils_2.convertValue)));
        });
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
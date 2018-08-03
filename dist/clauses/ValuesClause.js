"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IRIResolver2_1 = require("../iri/IRIResolver2");
var PatternBuilder2_1 = require("../patterns/PatternBuilder2");
var utils_1 = require("../patterns/utils");
var ValuesToken_1 = require("../tokens/ValuesToken");
var VariableToken_1 = require("../tokens/VariableToken");
var utils_2 = require("./utils");
function _normalizeVariables(variableOrVariables) {
    if (Array.isArray(variableOrVariables))
        return variableOrVariables.map(function (x) { return new VariableToken_1.VariableToken(x); });
    return [new VariableToken_1.VariableToken(variableOrVariables)];
}
function _normalizeRawValues(valuesOrBuilder, iriResolver) {
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(PatternBuilder2_1.PatternBuilder2.create(iriResolver)) :
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
        var token = new ValuesToken_1.ValuesToken();
        values.forEach(function (valuesRow, index) {
            token.addValues.apply(token, [variables[index]].concat(valuesRow.map(utils_1.convertValue)));
        });
        var targetToken = utils_2.cloneElement(container.targetToken, { values: token });
        var newContainer = utils_2.cloneElement(container, { iriResolver: iriResolver, targetToken: targetToken });
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

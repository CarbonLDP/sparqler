"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("./..");
var Container_1 = require("./../Container");
var IRIResolver_1 = require("./../../iri/IRIResolver");
var patterns_1 = require("./../../patterns");
var tokens_1 = require("./../../patterns/tokens");
var triples_1 = require("./../../patterns/triples");
var ObjectPattern_1 = require("./../../utils/ObjectPattern");
function values(variableOrVariables, valuesOrBuilder) {
    var isSingle = !Array.isArray(variableOrVariables);
    var variables = (isSingle ?
        [variableOrVariables] : variableOrVariables)
        .map(function (name) { return new triples_1.Variable(null, name); });
    var tokens = [tokens_1.VALUES];
    if (isSingle) {
        tokens.push.apply(tokens, variables[0].getSelfTokens().concat([tokens_1.OPEN_SINGLE_BLOCK]));
    }
    else {
        tokens.push(tokens_1.OPEN_SINGLE_LIST);
        variables.forEach(function (variable) { return tokens.push.apply(tokens, variable.getSelfTokens()); });
        tokens.push(tokens_1.CLOSE_SINGLE_LIST, tokens_1.OPEN_MULTI_BLOCK);
    }
    var iriResolver = void 0;
    var rawValues = typeof valuesOrBuilder === "function" ?
        valuesOrBuilder(new patterns_1.PatternBuilder(iriResolver = new IRIResolver_1.IRIResolver(this._iriResolver))) :
        valuesOrBuilder;
    var values = isSingle ?
        Array.isArray(rawValues) ? rawValues.map(function (value) { return [value]; }) : [[rawValues]] :
        Array.isArray(rawValues[0]) ? rawValues : [rawValues];
    values.forEach(function (valuesRow) {
        if (isSingle) {
            tokens.push.apply(tokens, ObjectPattern_1.serialize(valuesRow[0]));
        }
        else {
            tokens.push(tokens_1.OPEN_SINGLE_LIST);
            valuesRow.forEach(function (value) { return tokens.push.apply(tokens, ObjectPattern_1.serialize(value)); });
            tokens.push(tokens_1.CLOSE_SINGLE_LIST);
        }
    });
    tokens.push(isSingle ? tokens_1.CLOSE_SINGLE_BLOCK : tokens_1.CLOSE_MULTI_BLOCK);
    var container = new Container_1.Container(this, tokens, iriResolver);
    return this._finishDecorator(container, {});
}
function valuesDecorator(container, object) {
    return __1.genericDecorator({ values: values }, container, object);
}
exports.valuesDecorator = valuesDecorator;

//# sourceMappingURL=values.js.map

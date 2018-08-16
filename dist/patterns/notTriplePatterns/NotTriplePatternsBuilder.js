"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../data/Container");
var BindToken_1 = require("../../tokens/BindToken");
var FilterToken_1 = require("../../tokens/FilterToken");
var GraphToken_1 = require("../../tokens/GraphToken");
var GroupPatternToken_1 = require("../../tokens/GroupPatternToken");
var MinusPatternToken_1 = require("../../tokens/MinusPatternToken");
var OptionalToken_1 = require("../../tokens/OptionalToken");
var ServicePatternToken_1 = require("../../tokens/ServicePatternToken");
var UnionPatternToken_1 = require("../../tokens/UnionPatternToken");
var ValuesToken_1 = require("../../tokens/ValuesToken");
var VariableToken_1 = require("../../tokens/VariableToken");
var GroupPattern_1 = require("./GroupPattern");
var MultipleValuesPattern_1 = require("./MultipleValuesPattern");
var NotTriplePattern_1 = require("./NotTriplePattern");
var SingleValuesPattern_1 = require("./SingleValuesPattern");
var UnionPattern_1 = require("./UnionPattern");
function _getPatternContainer(container, targetToken) {
    return new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: targetToken,
    });
}
function _getPattern(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return NotTriplePattern_1.NotTriplePattern.createFrom(patternContainer, {});
}
function getGraphFn(container) {
    return function (iriOrVariable, patterns) {
        var varOrIRI = typeof iriOrVariable === "string" ?
            container.iriResolver.resolve(iriOrVariable) :
            iriOrVariable.getSubject();
        var token = new GraphToken_1.GraphToken(varOrIRI);
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        token.addPattern.apply(token, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getGroupFn(container) {
    return function (patterns) {
        var _a;
        var token = new GroupPatternToken_1.GroupPatternToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        (_a = token.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        var patternContainer = _getPatternContainer(container, token);
        return GroupPattern_1.GroupPattern.createFrom(patternContainer, {});
    };
}
function getUnionFn(container) {
    return function (patterns) {
        var token = new UnionPatternToken_1.UnionPatternToken();
        var patternContainer = _getPatternContainer(container, token);
        var unionPattern = UnionPattern_1.UnionPattern
            .createFrom(patternContainer, {});
        return unionPattern.and(patterns);
    };
}
function getOptionalFn(container) {
    return function (patterns) {
        var token = new OptionalToken_1.OptionalToken();
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        token.addPattern.apply(token, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getMinusFn(container) {
    return function (patterns) {
        var _a;
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        var token = new MinusPatternToken_1.MinusPatternToken();
        (_a = token.groupPattern.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getServiceFn(container, modifier) {
    return function (resource, patterns) {
        var _a;
        var varOrIRI = typeof resource === "string" ?
            container.iriResolver.resolve(resource) :
            resource.getSubject();
        var token = new ServicePatternToken_1.ServicePatternToken(varOrIRI, modifier);
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        (_a = token.groupPattern.patterns).push.apply(_a, patterns.map(function (x) { return x.getPattern(); }));
        return _getPattern(container, token);
    };
}
function getFilterFn(container) {
    return function (rawConstraint) {
        var token = new FilterToken_1.FilterToken(rawConstraint);
        return _getPattern(container, token);
    };
}
function getBindFn(container) {
    return function (rawExpression, variable) {
        var parsedVar = typeof variable === "string" ?
            new VariableToken_1.VariableToken(variable) :
            variable.getSubject();
        var token = new BindToken_1.BindToken(rawExpression, parsedVar);
        return _getPattern(container, token);
    };
}
function getValuesFn(container) {
    return function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        var _a;
        var token = new ValuesToken_1.ValuesToken();
        (_a = token.variables).push.apply(_a, variables.map(function (x) { return x.getSubject(); }));
        var patternContainer = _getPatternContainer(container, token);
        if (variables.length === 1)
            return SingleValuesPattern_1.SingleValuesPattern
                .createFrom(patternContainer, {});
        return MultipleValuesPattern_1.MultipleValuesPattern
            .createFrom(patternContainer, {});
    };
}
exports.NotTriplePatternsBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            undefined: "UNDEF",
            graph: getGraphFn(container),
            group: getGroupFn(container),
            union: getUnionFn(container),
            optional: getOptionalFn(container),
            minus: getMinusFn(container),
            service: getServiceFn(container),
            serviceSilent: getServiceFn(container, "SILENT"),
            filter: getFilterFn(container),
            bind: getBindFn(container),
            values: getValuesFn(container),
        });
    },
};

//# sourceMappingURL=NotTriplePatternsBuilder.js.map

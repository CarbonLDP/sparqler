"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container2_1 = require("../../data/Container2");
var Factory_1 = require("../../data/Factory");
var BlankNodePropertyToken_1 = require("../../tokens/BlankNodePropertyToken");
var BlankNodeToken_1 = require("../../tokens/BlankNodeToken");
var CollectionToken_1 = require("../../tokens/CollectionToken");
var LiteralToken_1 = require("../../tokens/LiteralToken");
var SubjectToken_1 = require("../../tokens/SubjectToken");
var VariableToken_1 = require("../../tokens/VariableToken");
var Pattern_1 = require("../Pattern");
var utils_1 = require("../utils");
var BlankNodeBuilder_1 = require("./BlankNodeBuilder");
var RDFLiteral_1 = require("./RDFLiteral");
var TriplePatternHas_1 = require("./TriplePatternHas");
function _getPatternContainer(container, token) {
    return new Container2_1.Container2({
        iriResolver: container.iriResolver,
        targetToken: new SubjectToken_1.SubjectToken(token),
    });
}
function _getPattern(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return TriplePatternHas_1.TriplePatternHas.createFrom(patternContainer, {});
}
function _getReadyPattern(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return Factory_1.Factory.createFrom(TriplePatternHas_1.TriplePatternHas.createFrom, Pattern_1.Pattern.createFrom)(patternContainer, {});
}
function getResourceFn(container) {
    return function (iri) {
        var token = container.iriResolver.resolve(iri);
        return _getPattern(container, token);
    };
}
function getVarFn(container) {
    return function (name) {
        var token = new VariableToken_1.VariableToken(name);
        return _getPattern(container, token);
    };
}
function getLiteralFn(container) {
    return function (value) {
        var token = new LiteralToken_1.LiteralToken(value);
        if (typeof value !== "string")
            return _getPattern(container, token);
        var patternContainer = _getPatternContainer(container, token);
        return RDFLiteral_1.RDFLiteral.createFrom(patternContainer, {});
    };
}
function getCollectionFn(container) {
    return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var _a;
        var token = (_a = new CollectionToken_1.CollectionToken()).addObject.apply(_a, values.map(utils_1.convertValue));
        return _getReadyPattern(container, token);
    };
}
function _getBlankNode(container, label) {
    if (label && !label.startsWith("_:"))
        label = "_:" + label;
    var token = new BlankNodeToken_1.BlankNodeToken(label);
    return _getPattern(container, token);
}
function _getBlankNodeProperty(container, builderFn) {
    var token = new BlankNodePropertyToken_1.BlankNodePropertyToken();
    var newContainer = new Container2_1.Container2({
        iriResolver: container.iriResolver,
        targetToken: token,
    });
    var builder = BlankNodeBuilder_1.BlankNodeBuilder.createFrom(newContainer, {});
    builderFn(builder);
    if (token.properties.length < 1)
        throw new Error("At least one property must be specified with the provided BlankNodeBuilder.");
    return _getReadyPattern(container, token);
}
function getBlankNodeFn(container) {
    return function (labelOrBuilderFn) {
        if (typeof labelOrBuilderFn === "function")
            return _getBlankNodeProperty(container, labelOrBuilderFn);
        return _getBlankNode(container, labelOrBuilderFn);
    };
}
exports.TriplePatternBuilder = {
    createFrom: function (container, object) {
        return Object.assign(object, {
            resource: getResourceFn(container),
            var: getVarFn(container),
            literal: getLiteralFn(container),
            collection: getCollectionFn(container),
            blankNode: getBlankNodeFn(container),
        });
    },
};

//# sourceMappingURL=TriplePatternBuilder.js.map

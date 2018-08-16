"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../../data/Container");
var Factory_1 = require("../../data/Factory");
var BlankNodePropertyToken_1 = require("../../tokens/BlankNodePropertyToken");
var BlankNodeToken_1 = require("../../tokens/BlankNodeToken");
var CollectionToken_1 = require("../../tokens/CollectionToken");
var LiteralToken_1 = require("../../tokens/LiteralToken");
var RDFLiteralToken_1 = require("../../tokens/RDFLiteralToken");
var SubjectToken_1 = require("../../tokens/SubjectToken");
var VariableToken_1 = require("../../tokens/VariableToken");
var Pattern_1 = require("../Pattern");
var utils_1 = require("../utils");
var BlankNodeBuilder_1 = require("./BlankNodeBuilder");
var RDFLiteral_1 = require("./RDFLiteral");
var TripleSubject_1 = require("./TripleSubject");
function _getPatternContainer(container, token) {
    return new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: new SubjectToken_1.SubjectToken(token),
    });
}
function _getTripleSubject(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return TripleSubject_1.TripleSubject.createFrom(patternContainer, {});
}
function _getNodeSubject(container, token) {
    var patternContainer = _getPatternContainer(container, token);
    return Factory_1.Factory.createFrom(TripleSubject_1.TripleSubject.createFrom, Pattern_1.Pattern.createFrom)(patternContainer, {});
}
function getResourceFn(container) {
    return function (iri) {
        var token = container.iriResolver.resolve(iri);
        return _getTripleSubject(container, token);
    };
}
function getVarFn(container) {
    return function (name) {
        var token = new VariableToken_1.VariableToken(name);
        return _getTripleSubject(container, token);
    };
}
function getLiteralFn(container) {
    return function (value) {
        if (typeof value !== "string") {
            var token_1 = new LiteralToken_1.LiteralToken(value);
            return _getTripleSubject(container, token_1);
        }
        var token = new RDFLiteralToken_1.RDFLiteralToken(value);
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
        return _getNodeSubject(container, token);
    };
}
function _getBlankNode(container, label) {
    if (label && !label.startsWith("_:"))
        label = "_:" + label;
    var token = new BlankNodeToken_1.BlankNodeToken(label);
    return _getTripleSubject(container, token);
}
function _getBlankNodeProperty(container, builderFn) {
    var token = new BlankNodePropertyToken_1.BlankNodePropertyToken();
    var builderContainer = new Container_1.Container({
        iriResolver: container.iriResolver,
        targetToken: token,
    });
    var builder = BlankNodeBuilder_1.BlankNodeBuilder.createFrom(builderContainer, {});
    builderFn(builder);
    if (token.properties.length < 1)
        throw new Error("At least one property must be specified by the self builder.");
    return _getNodeSubject(container, token);
}
function getBlankNodeFn(container) {
    return function (labelOrBuilderFn) {
        if (typeof labelOrBuilderFn === "function")
            return _getBlankNodeProperty(container, labelOrBuilderFn);
        return _getBlankNode(container, labelOrBuilderFn);
    };
}
exports.TriplePatternsBuilder = {
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

//# sourceMappingURL=TriplePatternsBuilder.js.map

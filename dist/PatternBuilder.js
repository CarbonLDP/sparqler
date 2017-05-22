"use strict";
var Literals_1 = require("./TriplesPatterns/Literals");
var Resource_1 = require("./TriplesPatterns/Resource");
var Variable_1 = require("./TriplesPatterns/Variable");
var BlankNode_1 = require("./TriplesPatterns/BlankNode");
var Collection_1 = require("./TriplesPatterns/Collection");
var NotTriplesPattern_1 = require("./NotTriplesPatterns/NotTriplesPattern");
var Tokens_1 = require("./Patterns/Tokens");
var Utils = require("./Utils/Patterns");
var ValuesPattern_1 = require("./NotTriplesPatterns/ValuesPattern");
var StringLiteral_1 = require("./Tokens/StringLiteral");
var PatternBuilder = (function () {
    function PatternBuilder(resolver) {
        this.resolver = resolver;
    }
    Object.defineProperty(PatternBuilder, "undefined", {
        get: function () { return "UNDEF"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PatternBuilder.prototype, "undefined", {
        get: function () { return PatternBuilder.undefined; },
        enumerable: true,
        configurable: true
    });
    ;
    PatternBuilder.prototype.resource = function (iri) {
        return new Resource_1.Resource(this.resolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new Variable_1.Variable(this.resolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new Literals_1.RDFLiteral(this.resolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new Literals_1.NumericLiteral(this.resolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new Literals_1.BooleanLiteral(this.resolver, value);
        throw new Error("InvalidArgumentError: No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("InvalidArgumentError: The collection needs at least one value.");
        return new Collection_1.Collection(this.resolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new BlankNode_1.BlankNode(this.resolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.resolver._resolveIRI(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = Utils.getBlockTokens(patterns1);
        var rightPatternTokens = Utils.getBlockTokens(patterns2);
        return new NotTriplesPattern_1.NotTriplesPattern(leftPatternTokens.concat([Tokens_1.UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new ValuesPattern_1.ValuesPattern(this.resolver, variables);
    };
    PatternBuilder.prototype.service = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.SERVICE].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Utils.getBlockTokens(patterns);
        return new NotTriplesPattern_1.NotTriplesPattern([Tokens_1.SERVICE, Tokens_1.SILENT].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.bind = function (rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        var patternTokens = [Tokens_1.BIND, Tokens_1.OPEN_SINGLE_LIST, new StringLiteral_1.StringLiteral(rawExpression), Tokens_1.AS].concat(variable.getSelfTokens(), [Tokens_1.CLOSE_SINGLE_LIST]);
        return new NotTriplesPattern_1.NotTriplesPattern(patternTokens);
    };
    return PatternBuilder;
}());
exports.PatternBuilder = PatternBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PatternBuilder;

//# sourceMappingURL=PatternBuilder.js.map

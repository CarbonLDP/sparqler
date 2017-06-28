"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notTriples_1 = require("sparqler/patterns/notTriples");
var tokens_1 = require("sparqler/patterns/tokens");
var triples_1 = require("sparqler/patterns/triples");
var tokens_2 = require("sparqler/tokens");
var Patterns_1 = require("sparqler/utils/Patterns");
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
        return new triples_1.Resource(this.resolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new triples_1.Variable(this.resolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new triples_1.RDFLiteral(this.resolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new triples_1.NumericLiteral(this.resolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new triples_1.BooleanLiteral(this.resolver, value);
        throw new Error("InvalidArgumentError: No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("InvalidArgumentError: The collection needs at least one value.");
        return new triples_1.Collection(this.resolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new triples_1.BlankNode(this.resolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.resolver._resolveIRI(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = Patterns_1.getBlockTokens(patterns1);
        var rightPatternTokens = Patterns_1.getBlockTokens(patterns2);
        return new notTriples_1.NotTriplesPattern(leftPatternTokens.concat([tokens_1.UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new notTriples_1.ValuesPattern(this.resolver, variables);
    };
    PatternBuilder.prototype.service = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.SERVICE].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.resolver._resolveIRI(resource) :
            resource.getSelfTokens();
        var patternTokens = Patterns_1.getBlockTokens(patterns);
        return new notTriples_1.NotTriplesPattern([tokens_1.SERVICE, tokens_1.SILENT].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.bind = function (rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        var patternTokens = [tokens_1.BIND, tokens_1.OPEN_SINGLE_LIST, new tokens_2.StringLiteral(rawExpression), tokens_1.AS].concat(variable.getSelfTokens(), [tokens_1.CLOSE_SINGLE_LIST]);
        return new notTriples_1.NotTriplesPattern(patternTokens);
    };
    PatternBuilder.prototype.filter = function (rawConstraint) {
        return new notTriples_1.NotTriplesPattern([tokens_1.FILTER, new tokens_2.StringLiteral(rawConstraint)]);
    };
    return PatternBuilder;
}());
exports.PatternBuilder = PatternBuilder;
exports.default = PatternBuilder;

//# sourceMappingURL=PatternBuilder.js.map

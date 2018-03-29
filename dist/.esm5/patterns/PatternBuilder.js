import { Container } from "./../clauses/Container";
import { selectDecorator, subFinishDecorator, } from "./../clauses/decorators";
import { NotTriplesPattern } from "./notTriples/NotTriplesPattern";
import { ValuesPattern } from "./notTriples/ValuesPattern";
import { AS, BIND, CLOSE_SINGLE_LIST, FILTER, GRAPH, MINUS, OPEN_SINGLE_LIST, OPTIONAL, SERVICE, SILENT, UNION, } from "./tokens";
import { BlankNode } from "./triples/BlankNode";
import { Collection } from "./triples/Collection";
import { BooleanLiteral, NumericLiteral, RDFLiteral, } from "./triples/Literals";
import { Resource } from "./triples/Resource";
import { Variable } from "./triples/Variable";
import { StringLiteral } from "./../tokens/StringLiteral";
import { getBlockTokens } from "./../utils/Patterns";
var PatternBuilder = (function () {
    function PatternBuilder(iriResolver) {
        this.iriResolver = iriResolver;
        selectDecorator(new Container(subFinishDecorator), this);
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
        return new Resource(this.iriResolver, iri);
    };
    PatternBuilder.prototype.var = function (name) {
        return new Variable(this.iriResolver, name);
    };
    PatternBuilder.prototype.literal = function (value) {
        if (typeof value === "string" || value instanceof String)
            return new RDFLiteral(this.iriResolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new NumericLiteral(this.iriResolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new BooleanLiteral(this.iriResolver, value);
        throw new Error("No valid value of a literal was provided.");
    };
    PatternBuilder.prototype.collection = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        if (values.length === 0)
            throw Error("The collection needs at least one value.");
        return new Collection(this.iriResolver, values);
    };
    PatternBuilder.prototype.blankNode = function () {
        return new BlankNode(this.iriResolver);
    };
    PatternBuilder.prototype.graph = function (iriOrVariable, patterns) {
        var graph = (typeof iriOrVariable === "string")
            ? this.iriResolver.resolve(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        var patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([GRAPH].concat(graph, patternTokens));
    };
    PatternBuilder.prototype.optional = function (patterns) {
        var patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([OPTIONAL].concat(patternTokens));
    };
    PatternBuilder.prototype.union = function (patterns1, patterns2) {
        var leftPatternTokens = getBlockTokens(patterns1);
        var rightPatternTokens = getBlockTokens(patterns2);
        return new NotTriplesPattern(leftPatternTokens.concat([UNION], rightPatternTokens));
    };
    PatternBuilder.prototype.minus = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([MINUS].concat(patternTokens));
    };
    PatternBuilder.prototype.values = function () {
        var variables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            variables[_i] = arguments[_i];
        }
        return new ValuesPattern(this.iriResolver, variables);
    };
    PatternBuilder.prototype.service = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.iriResolver.resolve(resource) :
            resource.getSelfTokens();
        var patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([SERVICE].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.serviceSilent = function (resource, patterns) {
        var serviceTokens = typeof resource === "string" ?
            this.iriResolver.resolve(resource) :
            resource.getSelfTokens();
        var patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([SERVICE, SILENT].concat(serviceTokens, patternTokens));
    };
    PatternBuilder.prototype.bind = function (rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        var patternTokens = [BIND, OPEN_SINGLE_LIST, new StringLiteral(rawExpression), AS].concat(variable.getSelfTokens(), [CLOSE_SINGLE_LIST]);
        return new NotTriplesPattern(patternTokens);
    };
    PatternBuilder.prototype.filter = function (rawConstraint) {
        return new NotTriplesPattern([FILTER, new StringLiteral(rawConstraint)]);
    };
    return PatternBuilder;
}());
export { PatternBuilder };
export default PatternBuilder;

//# sourceMappingURL=PatternBuilder.js.map

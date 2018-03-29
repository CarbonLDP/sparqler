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
export class PatternBuilder {
    static get undefined() { return "UNDEF"; }
    ;
    get undefined() { return PatternBuilder.undefined; }
    ;
    constructor(iriResolver) {
        this.iriResolver = iriResolver;
        selectDecorator(new Container(subFinishDecorator), this);
    }
    resource(iri) {
        return new Resource(this.iriResolver, iri);
    }
    var(name) {
        return new Variable(this.iriResolver, name);
    }
    literal(value) {
        if (typeof value === "string" || value instanceof String)
            return new RDFLiteral(this.iriResolver, value);
        if (typeof value === "number" || value instanceof Number)
            return new NumericLiteral(this.iriResolver, value);
        if (typeof value === "boolean" || value instanceof Boolean)
            return new BooleanLiteral(this.iriResolver, value);
        throw new Error("No valid value of a literal was provided.");
    }
    collection(...values) {
        if (values.length === 0)
            throw Error("The collection needs at least one value.");
        return new Collection(this.iriResolver, values);
    }
    blankNode() {
        return new BlankNode(this.iriResolver);
    }
    graph(iriOrVariable, patterns) {
        let graph = (typeof iriOrVariable === "string")
            ? this.iriResolver.resolve(iriOrVariable)
            : iriOrVariable.getSelfTokens();
        let patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([GRAPH, ...graph, ...patternTokens]);
    }
    optional(patterns) {
        let patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([OPTIONAL, ...patternTokens]);
    }
    union(patterns1, patterns2) {
        let leftPatternTokens = getBlockTokens(patterns1);
        let rightPatternTokens = getBlockTokens(patterns2);
        return new NotTriplesPattern([...leftPatternTokens, UNION, ...rightPatternTokens]);
    }
    minus(...patterns) {
        let patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([MINUS, ...patternTokens]);
    }
    values(...variables) {
        return new ValuesPattern(this.iriResolver, variables);
    }
    service(resource, patterns) {
        const serviceTokens = typeof resource === "string" ?
            this.iriResolver.resolve(resource) :
            resource.getSelfTokens();
        const patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([SERVICE, ...serviceTokens, ...patternTokens]);
    }
    serviceSilent(resource, patterns) {
        const serviceTokens = typeof resource === "string" ?
            this.iriResolver.resolve(resource) :
            resource.getSelfTokens();
        const patternTokens = getBlockTokens(patterns);
        return new NotTriplesPattern([SERVICE, SILENT, ...serviceTokens, ...patternTokens]);
    }
    bind(rawExpression, variable) {
        variable = typeof variable === "string" ? this.var(variable) : variable;
        const patternTokens = [BIND, OPEN_SINGLE_LIST, new StringLiteral(rawExpression), AS, ...variable.getSelfTokens(), CLOSE_SINGLE_LIST];
        return new NotTriplesPattern(patternTokens);
    }
    filter(rawConstraint) {
        return new NotTriplesPattern([FILTER, new StringLiteral(rawConstraint)]);
    }
}
export default PatternBuilder;

//# sourceMappingURL=PatternBuilder.js.map

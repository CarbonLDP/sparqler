import { Undefined } from "./PatternBuilder";
import { Literal, RDFLiteral, NumericLiteral, BooleanLiteral } from "./TriplesPatterns/Literals";
import { Resource } from "./TriplesPatterns/Resource";
import { Variable } from "./TriplesPatterns/Variable";
import { Token } from "./Tokens/Token";
import { BlankNode } from "./TriplesPatterns/BlankNode";
import { Collection } from "./TriplesPatterns/Collection";
import { NotTriplesPattern } from "./NotTriplesPatterns/NotTriplesPattern";
export interface IRIResolver {
    _resolveIRI(iri: string, vocab?: boolean): Token[];
}
export interface ElementPattern {
    getSelfTokens(): Token[];
}
export interface GraphPattern {
    getPattern(): Token[];
}
export interface NotTriplesPatternBuilder {
    graph(iri: string, pattern: GraphPattern): NotTriplesPattern;
    graph(iri: string, patterns: GraphPattern[]): NotTriplesPattern;
    graph(variable: Variable, pattern: GraphPattern): NotTriplesPattern;
    graph(variable: Variable, patterns: GraphPattern[]): NotTriplesPattern;
    optional(pattern: GraphPattern): NotTriplesPattern;
    optional(patterns: GraphPattern[]): NotTriplesPattern;
    union(pattern1: GraphPattern, pattern2: GraphPattern): NotTriplesPattern;
    union(pattern1: GraphPattern, patterns2: GraphPattern[]): NotTriplesPattern;
    union(patterns1: GraphPattern[], pattern2: GraphPattern): NotTriplesPattern;
    union(patterns1: GraphPattern[], patterns2: GraphPattern[]): NotTriplesPattern;
    minus(pattern: GraphPattern): NotTriplesPattern;
    minus(firstPattern: GraphPattern, ...restPatterns: GraphPattern[]): NotTriplesPattern;
    undefined: Undefined;
    values(variable: Variable): SingleValuesPattern;
    values(...variables: Variable[]): MultipleValuesPattern;
    service(iri: string, pattern: GraphPattern): NotTriplesPattern;
    service(iri: string, patterns: GraphPattern[]): NotTriplesPattern;
    service(resource: Resource, pattern: GraphPattern): NotTriplesPattern;
    service(resource: Resource, patterns: GraphPattern[]): NotTriplesPattern;
    service(variable: Variable, pattern: GraphPattern): NotTriplesPattern;
    service(variable: Variable, patterns: GraphPattern[]): NotTriplesPattern;
    bind(rawExpression: string, variable: string | Variable): NotTriplesPattern;
    filter(rawConstraint: string): NotTriplesPattern;
}
export interface SingleValuesPattern extends NotTriplesPattern {
    has(value: SupportedNativeTypes): SingleValuesPatternMore;
    has(value: Resource): SingleValuesPatternMore;
    has(value: Literal): SingleValuesPatternMore;
    has(value: Undefined): SingleValuesPatternMore;
}
export interface SingleValuesPatternMore extends NotTriplesPattern {
    and(value: SupportedNativeTypes): SingleValuesPatternMore;
    and(value: Resource): SingleValuesPatternMore;
    and(value: Literal): SingleValuesPatternMore;
    and(value: Undefined): SingleValuesPatternMore;
}
export interface MultipleValuesPattern extends NotTriplesPattern {
    has(...values: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore;
}
export interface MultipleValuesPatternMore extends NotTriplesPattern {
    and(...values: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore;
}
export declare type SupportedNativeTypes = boolean | number | string | Date;
export interface TriplesPatternBuilder {
    resource(iri: string): Resource;
    var(name: string): Variable;
    literal(value: string): RDFLiteral;
    literal(value: number): NumericLiteral;
    literal(value: boolean): BooleanLiteral;
    collection(...values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): Collection;
    blankNode(): BlankNode;
}
export interface TriplesSameSubject<T> {
    has(propertyIRI: string, value: SupportedNativeTypes): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, resource: Resource): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, variable: Variable): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, literal: Literal): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, node: TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, value: SupportedNativeTypes): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, resource: Resource): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, variable: Variable): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, literal: Literal): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, node: TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
}
export interface TriplesSameSubjectMore<T> {
    and(propertyIRI: string, resource: Resource): TriplesSameSubjectMore<T> & T;
    and(propertyIRI: string, variable: Variable): TriplesSameSubjectMore<T> & T;
    and(propertyIRI: string, literal: Literal): TriplesSameSubjectMore<T> & T;
    and(propertyIRI: string, node: TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    and(propertyIRI: string, value: SupportedNativeTypes): TriplesSameSubjectMore<T> & T;
    and(propertyIRI: string, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
    and(propertyVariable: Variable, resource: Resource): TriplesSameSubjectMore<T> & T;
    and(propertyVariable: Variable, variable: Variable): TriplesSameSubjectMore<T> & T;
    and(propertyVariable: Variable, literal: Literal): TriplesSameSubjectMore<T> & T;
    and(propertyVariable: Variable, node: TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    and(propertyVariable: Variable, value: SupportedNativeTypes): TriplesSameSubjectMore<T> & T;
    and(propertyVariable: Variable, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
}
export interface TriplesNodePattern extends GraphPattern, ElementPattern {
}

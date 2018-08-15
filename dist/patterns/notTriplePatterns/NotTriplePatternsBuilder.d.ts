import { Container } from "../../data/Container";
import { Pattern } from "../Pattern";
import { Resource } from "../triplePatterns/Resource";
import { Variable } from "../triplePatterns/Variable";
import { Undefined } from "../Undefined";
import { BindPattern } from "./BindPattern";
import { FilterPattern } from "./FilterPattern";
import { GraphPattern } from "./GraphPattern";
import { GroupPattern } from "./GroupPattern";
import { MinusPattern } from "./MinusPattern";
import { MultipleValuesPattern } from "./MultipleValuesPattern";
import { OptionalPattern } from "./OptionalPattern";
import { ServicePattern } from "./ServicePattern";
import { SingleValuesPattern } from "./SingleValuesPattern";
import { UnionPattern } from "./UnionPattern";
export interface NotTriplePatternsBuilder {
    undefined: Undefined;
    graph(iri: string | Resource | Variable, patterns: Pattern | Pattern[]): GraphPattern;
    group(patterns: Pattern | Pattern[]): GroupPattern;
    union(patterns: Pattern | Pattern[]): UnionPattern;
    optional(patterns: Pattern | Pattern[]): OptionalPattern;
    minus(patterns: Pattern | Pattern[]): MinusPattern;
    service(resource: string | Resource | Variable, patterns: Pattern | Pattern[]): ServicePattern;
    serviceSilent(resource: string | Resource | Variable, patterns: Pattern | Pattern[]): ServicePattern;
    filter(rawConstraint: string): FilterPattern;
    bind(rawExpression: string, variable: string | Variable): BindPattern;
    values(variable: Variable): SingleValuesPattern;
    values(...variables: Variable[]): MultipleValuesPattern;
}
export declare const NotTriplePatternsBuilder: {
    createFrom<O extends object>(container: Container<undefined>, object: O): O & NotTriplePatternsBuilder;
};

import { Container2 } from "../../data/Container2";
import { TokenNode } from "../../tokens/TokenNode";
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
export interface NotTriplePatternBuilder {
    undefined: Undefined;
    graph(iri: string | Resource | Variable, pattern: Pattern): GraphPattern;
    graph(iri: string | Resource | Variable, patterns: Pattern[]): GraphPattern;
    group(patterns: Pattern | Pattern[]): GroupPattern;
    optional(pattern: Pattern): OptionalPattern;
    optional(patterns: Pattern[]): OptionalPattern;
    minus(pattern: Pattern): MinusPattern;
    minus(firstPattern: Pattern, ...restPatterns: Pattern[]): MinusPattern;
    service(resource: string | Resource | Variable, patterns: Pattern | Pattern[]): ServicePattern;
    serviceSilent(resource: string | Resource | Variable, patterns: Pattern | Pattern[]): ServicePattern;
    filter(rawConstraint: string): FilterPattern;
    bind(rawExpression: string, variable: string | Variable): BindPattern;
    values(variable: Variable): SingleValuesPattern;
    values(...variables: Variable[]): MultipleValuesPattern;
}
export declare const NotTriplePatternBuilder: {
    createFrom<C extends Container2<TokenNode>, O extends object>(container: C, object: O): O & NotTriplePatternBuilder;
};

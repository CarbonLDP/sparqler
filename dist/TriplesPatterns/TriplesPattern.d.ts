import { TriplesSameSubject, TriplesSameSubjectMore, supportedNativeTypes, IRIResolver, GraphPattern, ElementPattern, TriplesNodePattern } from "../Patterns";
import { Literal } from "./Literals";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
import { Token } from "../Tokens/Token";
export declare abstract class TriplesPattern<T extends GraphPattern> implements TriplesSameSubject<T>, ElementPattern {
    protected abstract elementTokens: Token[];
    protected patternTokens: Token[];
    protected interfaces: {
        addPattern: TriplesSameSubjectMore<T>;
        graphPattern?: T;
    };
    private resolver;
    constructor(resolver: IRIResolver);
    has(propertyIRI: string, value: supportedNativeTypes): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, resource: Resource): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, variable: Variable): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, literal: Literal): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, node: TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    has(propertyIRI: string, values: (supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, value: supportedNativeTypes): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, resource: Resource): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, variable: Variable): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, literal: Literal): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, node: TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    has(propertyVariable: Variable, values: (supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
    getSelfTokens(): Token[];
    protected init(): void;
}
export default TriplesPattern;

import { TriplesSameSubject, TriplesSameSubjectMore, SupportedNativeTypes, IRIResolver, GraphPattern, ElementPattern, TriplesNodePattern } from "../Patterns";
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
    has(property: string | Variable | Resource, object: SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern): TriplesSameSubjectMore<T> & T;
    has(property: string | Variable | Resource, objects: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]): TriplesSameSubjectMore<T> & T;
    getSelfTokens(): Token[];
    protected init(): void;
    private _addPattern(property, objects);
    private static PATH_OPERATORS;
    private _resolvePath(propertyPath);
}
export default TriplesPattern;

import { IRIResolver } from "./../../iri/IRIResolver";
import { MultipleValuesPattern, MultipleValuesPatternMore, SingleValuesPattern, SingleValuesPatternMore, SupportedNativeTypes, Undefined } from "./..";
import { NotTriplesPattern } from "./";
import { Literal, Resource, Variable } from "./../triples";
import { Token } from "./../../tokens";
export declare class ValuesPattern extends NotTriplesPattern implements SingleValuesPattern, MultipleValuesPattern {
    private resolver;
    private length;
    protected interfaces: {
        addPattern: SingleValuesPatternMore | MultipleValuesPatternMore;
    };
    constructor(resolver: IRIResolver, variables: Variable[]);
    has(value: SupportedNativeTypes): SingleValuesPatternMore;
    has(value: Resource): SingleValuesPatternMore;
    has(value: Literal): SingleValuesPatternMore;
    has(value: Undefined): SingleValuesPatternMore;
    has(...values: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore;
    getPattern(): Token[];
    private init();
}
export default ValuesPattern;

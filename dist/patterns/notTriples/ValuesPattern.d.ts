import { IRIResolver } from "../../iri/IRIResolver";
import { Literal, Resource, Variable } from "../../patterns/triples";
import { Token } from "../../tokens";
import { MultipleValuesPattern, MultipleValuesPatternMore, SingleValuesPattern, SingleValuesPatternMore, SupportedNativeTypes } from "../interfaces";
import { Undefined } from "../PatternBuilder";
import { NotTriplesPattern } from "./NotTriplesPattern";
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

import { IRIResolver, MultipleValuesPattern, MultipleValuesPatternMore, SingleValuesPattern, SingleValuesPatternMore, SupportedNativeTypes, Undefined } from "sparqler/patterns";
import { NotTriplesPattern } from "sparqler/patterns/notTriples";
import { Literal, Resource, Variable } from "sparqler/patterns/triples";
import { Token } from "sparqler/tokens";
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

import { NotTriplesPattern } from "./NotTriplesPattern";
import { SingleValuesPattern, supportedNativeTypes, SingleValuesPatternMore, IRIResolver, MultipleValuesPattern, MultipleValuesPatternMore } from "../Patterns";
import { Resource } from "../TriplesPatterns/Resource";
import { Literal } from "../TriplesPatterns/Literals";
import { Undefined } from "../PatternBuilder";
import { Variable } from "../TriplesPatterns/Variable";
import { Token } from "../Tokens/Token";
export declare class ValuesPattern extends NotTriplesPattern implements SingleValuesPattern, MultipleValuesPattern {
    private resolver;
    private length;
    protected interfaces: {
        addPattern: SingleValuesPatternMore | MultipleValuesPatternMore;
    };
    constructor(resolver: IRIResolver, variables: Variable[]);
    has(value: supportedNativeTypes): SingleValuesPatternMore;
    has(value: Resource): SingleValuesPatternMore;
    has(value: Literal): SingleValuesPatternMore;
    has(value: Undefined): SingleValuesPatternMore;
    has(...values: (supportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore;
    getPattern(): Token[];
    private init();
}
export default ValuesPattern;

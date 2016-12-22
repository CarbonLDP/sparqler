import { NotTriplesPattern } from "./NotTriplesPattern";
import { SingleValuesPattern, supportedNativeTypes, SingleValuesPatternMore, IRIResolver, MultipleValuesPattern, MultipleValuesPatternMore } from "../Patterns";
import { Resource } from "../TriplesPatterns/Resource";
import { Literal } from "../TriplesPatterns/Literals";
import { Undefined } from "../PatternBuilder";
import { Variable } from "../TriplesPatterns/Variable";
import { Token } from "../Tokens/Token";
export declare class ValuesPattern extends NotTriplesPattern implements SingleValuesPattern, MultipleValuesPattern {
    private resolver;
    private isSingle;
    protected interfaces: {
        addPattern: (SingleValuesPatternMore | MultipleValuesPatternMore) & NotTriplesPattern;
    };
    constructor(resolver: IRIResolver, variables: Variable[]);
    has(value: supportedNativeTypes): SingleValuesPatternMore & NotTriplesPattern;
    has(value: Resource): SingleValuesPatternMore & NotTriplesPattern;
    has(value: Literal): SingleValuesPatternMore & NotTriplesPattern;
    has(value: Undefined): SingleValuesPatternMore & NotTriplesPattern;
    has(...values: (supportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore & NotTriplesPattern;
    getPattern(): Token[];
    private init();
}
export default ValuesPattern;

import { Container } from "../../data/Container";
import { ValuesToken } from "../../tokens/ValuesToken";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";
import { Undefined } from "../Undefined";
import { NotTriplePattern } from "./NotTriplePattern";
export interface MultipleValuesPattern extends NotTriplePattern<ValuesToken> {
    has(...values: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore;
}
export interface MultipleValuesPatternMore extends NotTriplePattern<ValuesToken> {
    and(...values: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternMore;
}
export declare const MultipleValuesPattern: {
    createFrom<C extends Container<ValuesToken>, O extends object>(container: C, object: O): MultipleValuesPattern;
};
export declare const MultipleValuesPatternMore: {
    createFrom<C extends Container<ValuesToken>, O extends object>(container: C, object: O): MultipleValuesPatternMore;
};

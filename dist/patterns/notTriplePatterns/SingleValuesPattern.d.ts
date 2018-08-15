import { Container } from "../../data/Container";
import { ValuesToken } from "../../tokens/ValuesToken";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";
import { Undefined } from "../Undefined";
import { NotTriplePattern } from "./NotTriplePattern";
export interface SingleValuesPattern extends NotTriplePattern<ValuesToken> {
    has(value: SupportedNativeTypes | Resource | Literal | Undefined): SingleValuesPatternMore;
}
export interface SingleValuesPatternMore extends NotTriplePattern<ValuesToken> {
    and(value: SupportedNativeTypes | Resource | Literal | Undefined): SingleValuesPatternMore;
}
export declare const SingleValuesPattern: {
    createFrom<C extends Container<ValuesToken>, O extends object>(container: C, object: O): SingleValuesPattern;
};
export declare const SingleValuesPatternMore: {
    createFrom<C extends Container<ValuesToken>, O extends object>(container: C, object: O): SingleValuesPatternMore;
};

import { Container2 } from "../../data/Container2";
import { ValuesToken } from "../../tokens/ValuesToken";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { Literal } from "../triplePatterns/Literal";
import { Resource } from "../triplePatterns/Resource";
import { Undefined } from "../Undefined";
import { NotTriplePattern } from "./NotTriplePattern";
export interface MultipleValuesPattern extends NotTriplePattern<ValuesToken> {
    has(...value: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternAnd;
}
export interface MultipleValuesPatternAnd extends NotTriplePattern<ValuesToken> {
    and(...value: (SupportedNativeTypes | Resource | Literal | Undefined)[]): MultipleValuesPatternAnd;
}
export declare const MultipleValuesPattern: {
    createFrom<C extends Container2<ValuesToken>, O extends object>(container: C, object: O): MultipleValuesPattern;
};
export declare const MultipleValuesPatternAnd: {
    createFrom<C extends Container2<ValuesToken>, O extends object>(container: C, object: O): MultipleValuesPatternAnd;
};

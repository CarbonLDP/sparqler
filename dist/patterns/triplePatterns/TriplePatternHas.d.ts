import { Container2 } from "../../data/Container2";
import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { Pattern } from "../Pattern";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { Resource } from "./Resource";
import { TriplePattern } from "./TriplePattern";
import { Variable } from "./Variable";
export interface TriplePatternHas<T extends ObjectToken> extends TriplePattern<T> {
    has(property: Variable | Resource | "a" | string, object: SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty): TriplePatternAnd<T>;
    has(property: Variable | Resource | "a" | string, objects: (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[]): TriplePatternAnd<T>;
}
export interface TriplePatternAnd<T extends ObjectToken> extends TriplePattern<T>, Pattern<TripleToken<T>> {
    and(property: Variable | Resource | "a" | string, object: SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty): TriplePatternAnd<T>;
    and(property: Variable | Resource | "a" | string, objects: (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[]): TriplePatternAnd<T>;
}
export declare const TriplePatternHas: {
    createFrom<T extends ObjectToken, C extends Container2<import("sparqler/tokens/SubjectToken").SubjectToken<T>>, O extends object>(container: C, object: O): O & TriplePatternHas<T>;
};
export declare const TriplePatternAnd: {
    createFrom<T extends ObjectToken, C extends Container2<import("sparqler/tokens/SubjectToken").SubjectToken<T>>, O extends object>(container: C, object: O): O & TriplePatternAnd<T>;
};

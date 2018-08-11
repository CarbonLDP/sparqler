import { Container } from "../../data/Container";
import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
export interface BlankNodeBuilder {
    has(property: Variable | Resource | "a" | string, object: SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty): BlankNodeBuilderAnd;
    has(property: Variable | Resource | "a" | string, objects: (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[]): BlankNodeBuilderAnd;
}
export interface BlankNodeBuilderAnd {
    and(property: Variable | Resource | "a" | string, object: SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty): BlankNodeBuilderAnd;
    and(property: Variable | Resource | "a" | string, objects: (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[]): BlankNodeBuilderAnd;
}
export declare const BlankNodeBuilder: {
    createFrom<C extends Container<BlankNodePropertyToken>, O extends object>(container: C, object: O): O & BlankNodeBuilder;
};
export declare const BlankNodeBuilderAnd: {
    createFrom<C extends Container<BlankNodePropertyToken>, O extends object>(container: C, object: O): O & BlankNodeBuilderAnd;
};

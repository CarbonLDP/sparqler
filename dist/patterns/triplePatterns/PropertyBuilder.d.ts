import { Container } from "../../data/Container";
import { Factory } from "../../data/Factory";
import { BlankNodePropertyToken } from "../../tokens/BlankNodePropertyToken";
import { TripleToken } from "../../tokens/TripleToken";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
export interface PropertyBuilder<T extends object> {
    has(property: Variable | Resource | "a" | string, objects: (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty) | (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[]): PropertyBuilderMore<T> & T;
}
export interface PropertyBuilderMore<T extends object> {
    and(property: Variable | Resource | "a" | string, objects: (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty) | (SupportedNativeTypes | Resource | Variable | Literal | Collection | BlankNodeProperty)[]): PropertyBuilderMore<T> & T;
}
export declare const PropertyBuilder: {
    createFrom<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & PropertyBuilder<T>;
};
export declare const PropertyBuilderMore: {
    createFrom<T extends object, C extends Container<TripleToken | BlankNodePropertyToken>, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & PropertyBuilderMore<T>;
};

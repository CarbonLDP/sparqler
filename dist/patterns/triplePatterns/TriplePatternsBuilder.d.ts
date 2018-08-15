import { Container } from "../../data/Container";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { BlankNode } from "./BlankNode";
import { BlankNodeBuilder } from "./BlankNodeBuilder";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { RDFLiteral } from "./RDFLiteral";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
export interface TriplePatternsBuilder {
    resource(iri: string): Resource;
    var(name: string): Variable;
    literal(value: string): RDFLiteral;
    literal(value: string | number | boolean): Literal;
    collection(...values: (SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty)[]): Collection;
    blankNode(label?: string): BlankNode;
    blankNode(builderFn: (selfBuilder: BlankNodeBuilder) => any): BlankNodeProperty;
}
export declare const TriplePatternsBuilder: {
    createFrom<O extends object>(container: Container<undefined>, object: O): O & TriplePatternsBuilder;
};

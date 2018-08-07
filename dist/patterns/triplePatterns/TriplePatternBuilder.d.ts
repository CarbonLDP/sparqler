import { Container2 } from "../../data/Container2";
import { TokenNode } from "../../tokens/TokenNode";
import { SupportedNativeTypes } from "../SupportedNativeTypes";
import { BlankNode } from "./BlankNode";
import { BlankNodeBuilder } from "./BlankNodeBuilder";
import { BlankNodeProperty } from "./BlankNodeProperty";
import { Collection } from "./Collection";
import { Literal } from "./Literal";
import { RDFLiteral } from "./RDFLiteral";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
export interface TriplePatternBuilder {
    resource(iri: string): Resource;
    blankNode(label?: string): BlankNode;
    var(name: string): Variable;
    literal(value: string): RDFLiteral;
    literal(value: number | boolean): Literal;
    collection(...values: (SupportedNativeTypes | Resource | BlankNode | Variable | Literal | Collection | BlankNodeProperty)[]): Collection;
    blankNodeProperty(builderFn: (blankNodeBuilder: BlankNodeBuilder) => any): BlankNodeProperty;
}
export declare const TriplePatternBuilder: {
    createFrom<C extends Container2<TokenNode>, O extends object>(container: C, object: O): O & TriplePatternBuilder;
};

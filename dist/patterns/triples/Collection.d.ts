import { IRIResolver } from "../../iri/IRIResolver";
import { Literal, Resource, Variable } from "../../patterns/triples";
import { Token } from "../../tokens";
import { SupportedNativeTypes, TriplesNodePattern } from "../interfaces";
import { TriplesPattern } from "./TriplesPattern";
export declare class Collection extends TriplesPattern<TriplesNodePattern> implements TriplesNodePattern {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]);
    getPattern(): Token[];
    protected init(): void;
}
export default Collection;

import { IRIResolver } from "sparqler/iri/IRIResolver";
import { SupportedNativeTypes, TriplesNodePattern } from "sparqler/patterns";
import { Literal, Resource, Variable } from "sparqler/patterns/triples";
import { Token } from "sparqler/tokens";
import { TriplesPattern } from "./TriplesPattern";
export declare class Collection extends TriplesPattern<TriplesNodePattern> implements TriplesNodePattern {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]);
    getPattern(): Token[];
    protected init(): void;
}
export default Collection;

import { IRIResolver } from "./../../iri/IRIResolver";
import { SupportedNativeTypes, TriplesNodePattern } from "./..";
import { Literal, Resource, Variable } from "./";
import { Token } from "./../../tokens";
import { TriplesPattern } from "./TriplesPattern";
export declare class Collection extends TriplesPattern<TriplesNodePattern> implements TriplesNodePattern {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, values: (SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]);
    getPattern(): Token[];
    protected init(): void;
}
export default Collection;

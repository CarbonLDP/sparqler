import { Token } from "../Tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { TriplesNodePattern, IRIResolver, supportedNativeTypes } from "../Patterns";
import { Resource } from "./Resource";
import { Variable } from "./Variable";
import { Literal } from "./Literals";
export declare class Collection extends TriplesPattern<TriplesNodePattern> implements TriplesNodePattern {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, values: (supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[]);
    getPattern(): Token[];
    protected init(): void;
}
export default Collection;

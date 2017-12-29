import { TriplesNodePattern } from "./..";
import { TriplesPattern } from "./TriplesPattern";
import { Token } from "./../../tokens";
export declare class BlankNode extends TriplesPattern<TriplesNodePattern> {
    protected elementTokens: Token[];
    getSelfTokens(): Token[];
    protected init(): void;
}
export default BlankNode;

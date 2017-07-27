import { TriplesNodePattern } from "sparqler/patterns";
import { TriplesPattern } from "./TriplesPattern";
import { Token } from "sparqler/tokens";
export declare class BlankNode extends TriplesPattern<TriplesNodePattern> {
    protected elementTokens: Token[];
    getSelfTokens(): Token[];
    protected init(): void;
}
export default BlankNode;

import { Token } from "../Tokens/Token";
import { TriplesPattern } from "./TriplesPattern";
import { TriplesNodePattern } from "../Patterns";
export declare class BlankNode extends TriplesPattern<TriplesNodePattern> {
    protected elementTokens: Token[];
    getSelfTokens(): Token[];
    protected init(): void;
}
export default BlankNode;

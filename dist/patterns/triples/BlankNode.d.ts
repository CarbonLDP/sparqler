import { Token } from "../../tokens/Token";
import { TriplesNodePattern } from "../interfaces";
import { TriplesPattern } from "./TriplesPattern";
export declare class BlankNode extends TriplesPattern<TriplesNodePattern> {
    protected elementTokens: Token[];
    getSelfTokens(): Token[];
    protected init(): void;
}
export default BlankNode;

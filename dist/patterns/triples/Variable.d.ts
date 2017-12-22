import { IRIResolver } from "../../iri/IRIResolver";
import { Token } from "../../tokens";
import { TriplesSubject } from "./TriplesSubject";
export declare class Variable extends TriplesSubject {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, name: string);
}
export default Variable;

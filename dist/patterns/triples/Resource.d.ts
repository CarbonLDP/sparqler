import { IRIResolver } from "../../iri/IRIResolver";
import { Token } from "../../tokens/Token";
import { TriplesSubject } from "./TriplesSubject";
export declare class Resource extends TriplesSubject {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, iri: string);
}
export default Resource;

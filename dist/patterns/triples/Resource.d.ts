import { IRIResolver } from "sparqler/patterns";
import { Token } from "sparqler/tokens";
import { TriplesSubject } from "./TriplesSubject";
export declare class Resource extends TriplesSubject {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, iri: string);
}
export default Resource;

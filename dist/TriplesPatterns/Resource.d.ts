import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";
import { Token } from "../Tokens/Token";
export declare class Resource extends TriplesSubject {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, iri: string);
}
export default Resource;

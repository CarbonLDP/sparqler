import { TriplesSubject } from "./TriplesSubject";
import { IRIResolver } from "../Patterns";
import { Token } from "../Tokens/Token";
export declare class Variable extends TriplesSubject {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, name: string);
}
export default Variable;

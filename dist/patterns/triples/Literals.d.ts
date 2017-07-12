import { IRIResolver } from "sparqler/iri/IRIResolver";
import { Token } from "sparqler/tokens";
import { TriplesSubject } from "./TriplesSubject";
export declare abstract class Literal extends TriplesSubject {
    protected value: string;
    constructor(resolver: IRIResolver, value: string | number | boolean);
}
export declare class RDFLiteral extends Literal {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, value: string);
    ofType(type: string): Literal;
    withLanguage(language: string): Literal;
}
export declare class NumericLiteral extends Literal {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, value: number);
}
export declare class BooleanLiteral extends Literal {
    protected elementTokens: Token[];
    constructor(resolver: IRIResolver, value: boolean);
}

import { FinishClause } from "sparqler/clauses/interfaces";
import { GraphPattern, IRIResolver } from "sparqler/patterns/interfaces";
import { Token } from "sparqler/tokens/Token";
export interface ObjectClause {
    [method: string]: Function;
}
export declare function genericDecorator<U extends ObjectClause, W extends object>(properties: U, base: Container<any>, object: W): W & U;
export declare type PrefixMap = Map<string, boolean>;
export declare class Resolver implements IRIResolver {
    readonly _prefixes: PrefixMap;
    readonly _vocab: string;
    constructor(base?: Resolver, vocab?: string);
    _resolveIRI(relativeIRI: string, vocab?: boolean): Token[];
}
export interface FinishDecorator<T extends FinishClause | GraphPattern> extends Function {
    <W extends object>(container: Container<T>, object: W): T & W;
}
export declare class Container<T extends FinishClause | GraphPattern = FinishClause> {
    readonly _tokens: Token[];
    readonly _finishDecorator: FinishDecorator<T>;
    readonly _iriResolver: Resolver;
    constructor();
    constructor(finishDecorator: FinishDecorator<T>);
    constructor(previousContainer: Container<any>, newTokens: Token[]);
    constructor(previousContainer: Container<any>, newTokens: Token[], iriResolver: Resolver);
}
export default Container;

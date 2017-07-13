import { FinishClause } from "sparqler/clauses/interfaces";
import { IRIResolver } from "sparqler/iri/IRIResolver";
import { GraphPattern } from "sparqler/patterns/interfaces";
import { Token } from "sparqler/tokens/Token";
export interface FinishDecorator<T extends FinishClause | GraphPattern> extends Function {
    <W extends object>(container: Container<T>, object: W): T & W;
}
export declare class Container<T extends FinishClause | GraphPattern = FinishClause> {
    readonly _tokens: Token[];
    readonly _finishDecorator: FinishDecorator<T>;
    readonly _iriResolver: IRIResolver;
    constructor();
    constructor(finishDecorator: FinishDecorator<T>);
    constructor(previousContainer: Container<any>, newTokens?: Token[], iriResolver?: IRIResolver);
}
export default Container;

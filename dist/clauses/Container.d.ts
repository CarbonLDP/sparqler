import { IRIResolver } from "../iri/IRIResolver";
import { Token } from "../tokens/Token";
import { FinishClause, SubFinishClause } from "./interfaces";
export interface FinishDecorator<T extends FinishClause | SubFinishClause> extends Function {
    <W extends object>(container: Container<T>, object: W): T & W;
}
export declare class Container<T extends FinishClause | SubFinishClause = FinishClause> {
    readonly _tokens: Token[];
    readonly _finishDecorator: FinishDecorator<T>;
    readonly _iriResolver?: IRIResolver;
    constructor(finishDecorator?: FinishDecorator<T>);
    constructor(previousContainer: Container<any>, newTokens?: Token[], iriResolver?: IRIResolver);
}
export default Container;

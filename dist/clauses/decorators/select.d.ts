import { Container, FinishDecorator } from "sparqler/clauses/Container";
import { FinishClause, SelectClause, SubSelect } from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns";
import { Token } from "sparqler/tokens";
export declare class SubSelectContainer extends Container<GraphPattern> {
    readonly _finishDecorator: FinishDecorator<GraphPattern>;
    constructor(previousContainer: Container<GraphPattern>, tokens: Token[]);
}
export declare function selectDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & SelectClause<T>;
export declare function subSelectDecorator<W extends object>(container: SubSelectContainer, object: W): W & SubSelect;

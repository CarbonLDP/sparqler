import { Container, FinishDecorator } from "sparqler/clauses/Container";
import { FinishClause, SelectClause, SubSelect } from "sparqler/clauses/interfaces";
import { IRIResolver } from "sparqler/iri";
import { GraphPattern } from "sparqler/patterns";
export declare class SubSelectContainer extends Container<GraphPattern> {
    readonly _finishDecorator: FinishDecorator<GraphPattern>;
    constructor(iriResolver: IRIResolver);
}
export declare function selectDecorator<T extends FinishClause, W extends object>(container: Container<T>, object: W): W & SelectClause<T>;
export declare function selectDecorator<W extends object>(container: SubSelectContainer, object: W): W & SubSelect;

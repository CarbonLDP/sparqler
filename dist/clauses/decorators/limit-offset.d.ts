import { Container } from "sparqler/clauses/Container";
import { FinishClause, LimitClause, LimitOffsetClause, OffsetClause } from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns/interfaces";
import { Token } from "sparqler/tokens";
export declare enum CurrentMethod {
    LIMIT = 0,
    OFFSET = 1,
}
export declare class LimitOffsetContainer<T extends FinishClause | GraphPattern = FinishClause> extends Container<T> {
    readonly _limitUsed: boolean;
    readonly _offsetUsed: boolean;
    constructor(previousContainer: Container<any>, newTokens: Token[], currentMethod: CurrentMethod);
}
export declare function limit<T extends FinishClause | GraphPattern>(this: LimitOffsetContainer<T>, limit: number): T | OffsetClause<T> & T;
export declare function offset<T extends FinishClause | GraphPattern>(this: LimitOffsetContainer<T>, offset: number): T | LimitClause<T> & T;
export declare function limitDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & LimitClause<T>;
export declare function offsetDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & OffsetClause<T>;
export declare function limitOffsetDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & LimitOffsetClause<T>;

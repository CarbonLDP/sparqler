import { Container } from "sparqler/clauses/Container";
import { FinishClause, LimitClause, LimitOffsetClause, OffsetClause } from "sparqler/clauses/interfaces";
import { GraphPattern } from "sparqler/patterns";
import { Token } from "sparqler/tokens";
export declare class LimitContainer<T extends FinishClause | GraphPattern> extends Container<T> {
    readonly _offsetUsed: boolean;
    constructor(previousContainer: Container<any>, newTokens: Token[], offsetUsed: boolean);
}
export declare class OffsetContainer<T extends FinishClause | GraphPattern> extends Container<T> {
    readonly _limitUsed: boolean;
    constructor(previousContainer: Container<any>, newTokens: Token[], limitUsed: boolean);
}
export declare function limit<T extends FinishClause | GraphPattern>(this: LimitContainer<T>, limit: number): T | OffsetClause<T> & T;
export declare function offset<T extends FinishClause | GraphPattern>(this: OffsetContainer<T>, offset: number): T | OffsetClause<T> & T;
export declare function limitBuilderDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & LimitClause<T>;
export declare function offsetBuilderDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & OffsetClause<T>;
export declare function limitOffsetDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & LimitOffsetClause<T>;

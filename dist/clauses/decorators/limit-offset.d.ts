import { ValuesClause } from "./../interfaces";
import { Container } from "./../Container";
import { FinishClause } from "./../interfaces";
import { SubFinishClause } from "./../interfaces";
import { LimitClause } from "./../interfaces";
import { LimitOffsetClause } from "./../interfaces";
import { OffsetClause } from "./../interfaces";
import { Token } from "./../../tokens";
export declare enum CurrentMethod {
    LIMIT = 0,
    OFFSET = 1
}
export declare class LimitOffsetContainer<T extends FinishClause | SubFinishClause = FinishClause> extends Container<T> {
    readonly _limitUsed: boolean;
    readonly _offsetUsed: boolean;
    constructor(previousContainer: Container<any>, newTokens: Token[], currentMethod: CurrentMethod);
}
export declare function limit<T extends FinishClause | SubFinishClause>(this: LimitOffsetContainer<T>, limit: number): (T & ValuesClause<T>) | (OffsetClause<T & ValuesClause<T>> & ValuesClause<T> & T);
export declare function offset<T extends FinishClause | SubFinishClause>(this: LimitOffsetContainer<T>, offset: number): (T & ValuesClause<T>) | (LimitClause<T & ValuesClause<T>> & ValuesClause<T> & T);
export declare function limitDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & LimitClause<T & ValuesClause<T>> & ValuesClause<T>;
export declare function offsetDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & OffsetClause<T & ValuesClause<T>> & ValuesClause<T>;
export declare function limitOffsetDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & LimitOffsetClause<T>;

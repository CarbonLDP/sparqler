import { Token } from "../../tokens";
import { Container } from "../Container";
import { FinishClause, LimitClause, LimitOffsetClause, OffsetClause, SubFinishClause, ValuesClause } from "../interfaces";
export declare enum CurrentMethod {
    LIMIT = 0,
    OFFSET = 1,
}
export declare class LimitOffsetContainer<T extends FinishClause | SubFinishClause = FinishClause> extends Container<T> {
    readonly _limitUsed: boolean;
    readonly _offsetUsed: boolean;
    constructor(previousContainer: Container<any>, newTokens: Token[], currentMethod: CurrentMethod);
}
export declare function limitDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & LimitClause<T & ValuesClause<T>> & ValuesClause<T>;
export declare function offsetDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & OffsetClause<T & ValuesClause<T>> & ValuesClause<T>;
export declare function limitOffsetDecorator<T extends FinishClause | SubFinishClause, W extends object>(container: Container<T>, object: W): W & LimitOffsetClause<T>;

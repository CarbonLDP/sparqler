import { Container } from "../data/Container";
import { TokenNode } from "../tokens/TokenNode";
export interface FinishClause {
    toCompactString(): string;
    toPrettyString(): string;
    toString(): string;
}
export declare const FinishClause: {
    createFrom<O extends object>(container: Container<TokenNode>, object: O): O & FinishClause;
};

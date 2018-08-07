import { Container2 } from "../data/Container2";
import { TokenNode } from "../tokens/TokenNode";
export interface FinishClause {
    toCompactString(): string;
    toPrettyString(): string;
    toString(): string;
}
export declare const FinishClause: {
    createFrom<O extends object>(container: Container2<TokenNode>, object: O): O & FinishClause;
};

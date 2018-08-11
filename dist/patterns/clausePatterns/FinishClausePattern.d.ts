import { FinishClause } from "../../clauses/FinishClause";
import { Container } from "../../data/Container";
import { SubSelectToken } from "../../tokens/SubSelectToken";
import { Pattern } from "../Pattern";
export interface FinishClausePattern extends Pattern<SubSelectToken>, FinishClause {
}
export declare const FinishClausePattern: {
    createFrom<C extends Container<SubSelectToken>, O extends object>(container: C, object: O): O & FinishClausePattern;
};

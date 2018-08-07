import { FinishClause } from "../../clauses/FinishClause";
import { Container2 } from "../../data/Container2";
import { SubSelectToken } from "../../tokens/SubSelectToken";
import { Pattern } from "../Pattern";
export interface FinishClausePattern extends Pattern<SubSelectToken>, FinishClause {
}
export declare const FinishClausePattern: {
    createFrom<C extends Container2<SubSelectToken>, O extends object>(container: C, object: O): O & FinishClausePattern;
};

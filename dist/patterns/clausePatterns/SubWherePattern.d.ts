import { Container2 } from "./../../data/Container2";
import { SubSelectToken } from "./../../tokens/SubSelectToken";
import { GroupClause } from "../../clauses/GroupClause";
import { Pattern } from "../Pattern";
import { FinishClausePattern } from "./FinishClausePattern";
export interface SubWherePattern {
    where(patterns: Pattern | Pattern[]): GroupClause<FinishClausePattern> & FinishClausePattern;
}
export declare const SubWherePattern: {
    createFrom<C extends Container2<SubSelectToken>, O extends object>(container: C, object: O): O & SubWherePattern;
};

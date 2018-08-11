import { Container } from "./../../data/Container";
import { SubSelectToken } from "./../../tokens/SubSelectToken";
import { GroupClause } from "../../clauses/GroupClause";
import { Pattern } from "../Pattern";
import { FinishPattern } from "./FinishPattern";
export interface SubWherePattern {
    where(patterns: Pattern | Pattern[]): GroupClause<FinishPattern> & FinishPattern;
}
export declare const SubWherePattern: {
    createFrom<C extends Container<SubSelectToken>, O extends object>(container: C, object: O): O & SubWherePattern;
};

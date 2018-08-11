import { Container } from "../../data/Container";
import { GroupPatternToken } from "../../tokens/GroupPatternToken";
import { Pattern } from "../Pattern";
import { NotTriplePattern } from "./NotTriplePattern";
import { UnionPattern } from "./UnionPattern";
export interface GroupPattern extends NotTriplePattern<GroupPatternToken> {
    union(patterns: Pattern | Pattern[]): UnionPattern;
}
export declare const GroupPattern: {
    createFrom<C extends Container<GroupPatternToken>, O extends object>(container: C, object: O): GroupPattern;
};

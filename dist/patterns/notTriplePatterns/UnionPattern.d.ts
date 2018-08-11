import { Container } from "../../data/Container";
import { UnionPatternToken } from "../../tokens/UnionPatternToken";
import { Pattern } from "../Pattern";
import { NotTriplePattern } from "./NotTriplePattern";
export interface UnionPattern extends NotTriplePattern<UnionPatternToken> {
    union(patterns: Pattern | Pattern[]): UnionPattern;
}
export declare const UnionPattern: {
    createFrom<C extends Container<UnionPatternToken>, O extends object>(container: C, object: O): UnionPattern;
};

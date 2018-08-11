import { Container } from "../data/Container";
import { PatternToken } from "../tokens/PatternToken";
export interface Pattern<T extends PatternToken = PatternToken> {
    getPattern(): T;
}
export declare const Pattern: {
    createFrom<T extends PatternToken, C extends Container<T>, O extends object>(container: C, object: O): O & Pattern<T>;
};

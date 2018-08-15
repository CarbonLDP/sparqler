import { Container } from "../../data/Container";
import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { Pattern } from "../Pattern";
export interface TriplePattern<T extends ObjectToken = ObjectToken> extends Pattern<TripleToken<T>> {
}
export declare const TriplePattern: {
    createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>(container: C, object: O): O & TriplePattern<T>;
};

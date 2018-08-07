import { Container2 } from "../../data/Container2";
import { ObjectToken } from "../../tokens/ObjectToken";
export interface TriplePattern<T extends ObjectToken> {
    getSubject(): T;
}
export declare const TriplePattern: {
    createFrom<T extends ObjectToken, C extends Container2<import("sparqler/tokens/SubjectToken").SubjectToken<T>>, O extends object>(container: C, object: O): O & TriplePattern<T>;
};

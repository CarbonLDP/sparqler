import { Container } from "../../data/Container";
import { ObjectToken } from "../../tokens/ObjectToken";
import { TripleToken } from "../../tokens/TripleToken";
import { PropertyBuilder } from "./PropertyBuilder";
import { TriplePattern } from "./TriplePattern";
export interface TripleSubject<T extends ObjectToken> extends PropertyBuilder<TriplePattern<T>> {
    getSubject(): T;
}
export declare const TripleSubject: {
    createFrom<T extends ObjectToken, C extends Container<TripleToken<T>>, O extends object>(container: C, object: O): O & TripleSubject<T>;
};

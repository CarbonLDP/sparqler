import { TokenNode } from "../tokens/TokenNode";
import { Container } from "./Container";
export interface Factory<CONTAINER extends Container<TokenNode>, TARGET extends object> extends Function {
    <OBJECT extends object>(container: CONTAINER, object: OBJECT): OBJECT & TARGET;
}
export declare const Factory: {
    createFrom<CONTAINER extends Container<TokenNode>, TARGET extends object>(factory: Factory<CONTAINER, TARGET>): Factory<CONTAINER, TARGET>;
    createFrom<CONTAINER extends Container<TokenNode>, TARGET1 extends object, TARGET2 extends object>(factory1: Factory<CONTAINER, TARGET1>, factory2: Factory<CONTAINER, TARGET2>): Factory<CONTAINER, TARGET1 & TARGET2>;
    createFrom<CONTAINER extends Container<TokenNode>, TARGET1 extends object, TARGET2 extends object, TARGET3 extends object>(factory1: Factory<CONTAINER, TARGET1>, factory2: Factory<CONTAINER, TARGET2>, factory3: Factory<CONTAINER, TARGET3>): Factory<CONTAINER, TARGET1 & TARGET2 & TARGET3>;
};

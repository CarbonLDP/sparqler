import { Container2 } from "../../data/Container2";
import { NotTripleToken } from "../../tokens/NotTripleToken";
import { Pattern } from "../Pattern";
export interface NotTriplePattern<T extends NotTripleToken = NotTripleToken> extends Pattern<T> {
    getPattern(): T;
}
export declare const NotTriplePattern: {
    createFrom<T extends NotTripleToken, C extends Container2<T>, O extends object>(container: C, object: O): O & NotTriplePattern<T>;
};

import { Container2 } from "./Container2";
export interface Factory<CONTAINER extends Container2<any>, CLAUSE extends object> extends Function {
    <OBJECT extends object>(container: CONTAINER, object: OBJECT): OBJECT & CLAUSE;
}
export declare const Factory: {
    createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object>(clauseFactory1: Factory<CONTAINER, CLAUSE1>): Factory<CONTAINER, CLAUSE1>;
    createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object, CLAUSE2 extends object>(clauseFactory1: Factory<CONTAINER, CLAUSE1>, clauseFactory2: Factory<CONTAINER, CLAUSE2>): Factory<CONTAINER, CLAUSE1 & CLAUSE2>;
    createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object, CLAUSE2 extends object, CLAUSE3 extends object>(clauseFactory1: Factory<CONTAINER, CLAUSE1>, clauseFactory2: Factory<CONTAINER, CLAUSE2>, clauseFactory3: Factory<CONTAINER, CLAUSE3>): Factory<CONTAINER, CLAUSE1 & CLAUSE2 & CLAUSE3>;
};

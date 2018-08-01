import { Container2 } from "./Container2";
export interface ClauseFactory<CONTAINER extends Container2<any>, CLAUSE extends object> extends Function {
    <OBJECT extends object>(container: CONTAINER, object: OBJECT): OBJECT & CLAUSE;
}
export declare const ClauseFactory: {
    createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object>(clauseFactory1: ClauseFactory<CONTAINER, CLAUSE1>): ClauseFactory<CONTAINER, CLAUSE1>;
    createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object, CLAUSE2 extends object>(clauseFactory1: ClauseFactory<CONTAINER, CLAUSE1>, clauseFactory2: ClauseFactory<CONTAINER, CLAUSE2>): ClauseFactory<CONTAINER, CLAUSE1 & CLAUSE2>;
    createFrom<CONTAINER extends Container2<any>, CLAUSE1 extends object, CLAUSE2 extends object, CLAUSE3 extends object>(clauseFactory1: ClauseFactory<CONTAINER, CLAUSE1>, clauseFactory2: ClauseFactory<CONTAINER, CLAUSE2>, clauseFactory3: ClauseFactory<CONTAINER, CLAUSE3>): ClauseFactory<CONTAINER, CLAUSE1 & CLAUSE2 & CLAUSE3>;
};

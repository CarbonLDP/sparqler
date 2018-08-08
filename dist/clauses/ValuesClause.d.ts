import { Container2 } from "../data/Container2";
import { Factory } from "../data/Factory";
import { PatternBuilder2 } from "../patterns/PatternBuilder2";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";
import { Literal } from "../patterns/triplePatterns/Literal";
import { Resource } from "../patterns/triplePatterns/Resource";
import { Variable } from "../patterns/triplePatterns/Variable";
import { Undefined } from "../patterns/Undefined";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
export interface ValuesClause<T extends FinishClause> {
    values(variable: string | Variable, values: SupportedNativeTypes | SupportedNativeTypes[]): T;
    values(variable: string | Variable, valuesBuilder: (builder: PatternBuilder2) => (SupportedNativeTypes | Resource | Literal | Undefined) | (SupportedNativeTypes | Resource | Literal | Undefined)[]): T;
    values(variables: (string | Variable)[], values: SupportedNativeTypes[] | SupportedNativeTypes[][]): T;
    values(variables: (string | Variable)[], valuesBuilder: (builder: PatternBuilder2) => (SupportedNativeTypes | Resource | Literal | Undefined)[] | (SupportedNativeTypes | Resource | Literal | Undefined)[][]): T;
}
export declare const ValuesClause: {
    createFrom<C extends Container2<QueryToken | SubSelectToken>, T extends FinishClause>(genericFactory: Factory<C, T>, container: C, object: T): T & ValuesClause<T>;
};

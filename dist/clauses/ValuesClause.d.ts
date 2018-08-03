import { PatternBuilder2 } from "../patterns/PatternBuilder2";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";
import { Literal } from "../patterns/triplePatterns/Literal";
import { Resource } from "../patterns/triplePatterns/Resource";
import { Undefined } from "../patterns/Undefined";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { FinishClause } from "./FinishClause";
import { SubFinishClause } from "./interfaces";
export interface ValuesClause<T extends FinishClause | SubFinishClause> {
    values(variable: string, values: SupportedNativeTypes | SupportedNativeTypes[]): T;
    values(variable: string, valuesBuilder: (builder: PatternBuilder2) => (SupportedNativeTypes | Resource | Literal | Undefined) | (SupportedNativeTypes | Resource | Literal | Undefined)[]): T;
    values(variables: string[], values: SupportedNativeTypes[] | SupportedNativeTypes[][]): T;
    values(variables: string[], valuesBuilder: (builder: PatternBuilder2) => (SupportedNativeTypes | Resource | Literal | Undefined)[] | (SupportedNativeTypes | Resource | Literal | Undefined)[][]): T;
}
export declare const ValuesClause: {
    createFrom<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause | SubFinishClause>(genericFactory: ClauseFactory<C, T>, container: C, object: T): T & ValuesClause<T>;
};

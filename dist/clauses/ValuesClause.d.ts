import { FinishClause } from "./FinishClause";
import { PatternBuilder, SupportedNativeTypes, Undefined } from "./../patterns";
import { Literal, Resource } from "./../patterns/triples";
import { QueryToken } from "./../tokens";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { ClauseFactory } from "./ClauseFactory";
import { Container2 } from "./Container2";
import { SubFinishClause } from "./interfaces";
export interface ValuesClause<T extends FinishClause | SubFinishClause> {
    values(variable: string, values: SupportedNativeTypes | SupportedNativeTypes[]): T;
    values(variable: string, valuesBuilder: (builder: PatternBuilder) => (SupportedNativeTypes | Resource | Literal | Undefined) | (SupportedNativeTypes | Resource | Literal | Undefined)[]): T;
    values(variables: string[], values: SupportedNativeTypes[] | SupportedNativeTypes[][]): T;
    values(variables: string[], valuesBuilder: (builder: PatternBuilder) => (SupportedNativeTypes | Resource | Literal | Undefined)[] | (SupportedNativeTypes | Resource | Literal | Undefined)[][]): T;
}
export declare const ValuesClause: {
    create<C extends Container2<SubSelectToken | QueryToken>, T extends FinishClause | SubFinishClause>(genericFactory: ClauseFactory<C, T>, container: C, object: T): T & ValuesClause<T>;
};

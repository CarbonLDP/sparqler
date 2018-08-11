import { Container } from "../data/Container";
import { Factory } from "../data/Factory";
import { PatternBuilder2 } from "../patterns/PatternBuilder2";
import { SupportedNativeTypes } from "../patterns/SupportedNativeTypes";
import { Literal } from "../patterns/triplePatterns/Literal";
import { Resource } from "../patterns/triplePatterns/Resource";
import { Undefined } from "../patterns/Undefined";
import { QueryToken } from "../tokens/QueryToken";
import { SubSelectToken } from "../tokens/SubSelectToken";
import { FinishClause } from "./FinishClause";
export interface ValuesClause<T extends FinishClause> {
    values(variable: string, values: SupportedNativeTypes | SupportedNativeTypes[]): T;
    values(variable: string, valuesBuilder: (builder: PatternBuilder2) => (SupportedNativeTypes | Resource | Literal | Undefined) | (SupportedNativeTypes | Resource | Literal | Undefined)[]): T;
    values(variables: string[], values: SupportedNativeTypes[] | SupportedNativeTypes[][]): T;
    values(variables: string[], valuesBuilder: (builder: PatternBuilder2) => (SupportedNativeTypes | Resource | Literal | Undefined)[] | (SupportedNativeTypes | Resource | Literal | Undefined)[][]): T;
}
export declare const ValuesClause: {
    createFrom<C extends Container<QueryToken | SubSelectToken>, T extends FinishClause, O extends object>(genericFactory: Factory<C, T>, container: C, object: O): O & ValuesClause<T>;
};

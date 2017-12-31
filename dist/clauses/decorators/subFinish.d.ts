import { Container } from "../Container";
import { SubFinishClause } from "../interfaces";
export declare function subFinishDecorator<W extends object>(container: Container<SubFinishClause>, object: W): W & SubFinishClause;

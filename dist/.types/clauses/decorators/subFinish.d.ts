import { SubFinishClause } from "./..";
import { Container } from "./../Container";
export declare function subFinishDecorator<W extends object>(container: Container<SubFinishClause>, object: W): W & SubFinishClause;

import { Container, FinishClause } from "../";
export declare function finishDecorator<W extends object>(container: Container<FinishClause>, object: W): W & FinishClause;

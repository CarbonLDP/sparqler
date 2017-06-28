import { Container, FinishClause, GroupClause } from "sparqler/clauses";
import { GraphPattern } from "sparqler/patterns";
export declare function groupDecorator<T extends FinishClause | GraphPattern, W extends object>(container: Container<T>, object: W): W & GroupClause<T>;

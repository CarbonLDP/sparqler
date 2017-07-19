import { Container } from "sparqler/clauses/Container";
import { GraphPattern } from "sparqler/patterns";
export declare function graphPatternDecorator<W extends object>(container: Container<GraphPattern>, object: W): W & GraphPattern;

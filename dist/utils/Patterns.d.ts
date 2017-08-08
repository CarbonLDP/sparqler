import { GraphPattern } from "sparqler/patterns";
import { Token } from "sparqler/tokens";
export declare function getBlockTokens(patterns: GraphPattern | GraphPattern[]): Token[];
export declare function getTokens(patterns: GraphPattern | GraphPattern[]): Token[];
export declare function isMultiLine(tokens: Token[]): boolean;

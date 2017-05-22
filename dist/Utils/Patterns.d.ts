import { GraphPattern } from "../Patterns";
import { Token } from "../Tokens/Token";
export declare function getBlockTokens(patterns: GraphPattern | GraphPattern[]): Token[];
export declare function getTokens(patterns: GraphPattern | GraphPattern[]): Token[];
export declare function isMultiLine(tokens: Token[]): boolean;

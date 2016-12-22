import { GraphPattern } from "../Patterns";
import { Token } from "../Tokens/Token";
export declare function getBlockTokens(pattern: GraphPattern): Token[];
export declare function getBlockTokens(patterns: GraphPattern[]): Token[];
export declare function getTokens(pattern: GraphPattern): Token[];
export declare function getTokens(patterns: GraphPattern[]): Token[];
export declare function isMultiLine(tokens: Token[]): boolean;

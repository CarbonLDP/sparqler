import { TokenNode } from "./TokenNode";
export declare const INDENTATION_SPACES: 4;
export declare function getSeparator(spaces?: number): " " | "\n";
export declare function getIndentation(spaces?: number, extra?: number): string;
export declare function addSpaces(spaces: number | undefined, extra: number): number | undefined;
export declare function getTokenContainerString(data: {
    spaces: number | undefined;
    tags: {
        open: string;
        close: string;
    };
    tokensSeparator?: string;
    tokens: TokenNode[];
}): string;
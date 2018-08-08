import { TokenNode } from "./TokenNode";
export declare class FilterToken implements TokenNode {
    readonly token: "filter";
    readonly constraint: string;
    constructor(constraint: string);
    toString(spaces?: number): string;
}

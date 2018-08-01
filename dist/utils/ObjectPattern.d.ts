import { IRIToken } from "./../tokens/IRIToken";
import { LiteralToken } from "./../tokens/LiteralToken";
import { PrefixedNameToken } from "./../tokens/PrefixedNameToken";
import { SupportedNativeTypes, ElementPattern } from "../patterns/interfaces";
import { Token } from "../tokens/Token";
export declare function serialize(object: SupportedNativeTypes | ElementPattern): Token[];
export declare function addType(value: string, type: string): Token[];
export declare function convertValue(value: SupportedNativeTypes | ElementPattern): IRIToken | PrefixedNameToken | LiteralToken | "UNDEF";

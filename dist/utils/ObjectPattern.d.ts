import { SupportedNativeTypes, ElementPattern } from "../patterns/interfaces";
import { Token } from "../tokens/Token";
export declare function serialize(object: SupportedNativeTypes | ElementPattern): Token[];
export declare function addType(value: string, type: string): Token[];

import { SupportedNativeTypes, ElementPattern } from "../patterns/interfaces";
import { Token } from "../tokens/Token";
export declare function serialize(object: SupportedNativeTypes): Token[];
export declare function serialize(object: ElementPattern): Token[];
export declare function addType(value: string, type: string): Token[];

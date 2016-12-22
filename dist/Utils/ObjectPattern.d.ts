import { supportedNativeTypes, ElementPattern } from "../Patterns";
import { Token } from "../Tokens/Token";
export declare function serialize(object: supportedNativeTypes): Token[];
export declare function serialize(object: ElementPattern): Token[];
export declare function addType(value: string, type: string): Token[];

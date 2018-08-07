import { Container2 } from "../data/Container2";
import { LiteralToken } from "../tokens/LiteralToken";
import { TokenNode } from "../tokens/TokenNode";
import { SupportedNativeTypes } from "./SupportedNativeTypes";
import { TriplePattern } from "./triplePatterns/TriplePattern";
export declare function convertValue(value: "UNDEF"): "UNDEF";
export declare function convertValue<T extends TriplePattern<any> | SupportedNativeTypes>(value: T): T extends TriplePattern<infer TOKEN> ? TOKEN : LiteralToken;
export declare function _resolvePath(container: Container2<TokenNode>, propertyPath: string): "a";

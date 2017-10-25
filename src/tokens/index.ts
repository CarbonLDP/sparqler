import { BlankNodeToken } from "sparqler/tokens/BlankNodeToken";
import { FilterToken } from "sparqler/tokens/FilterToken";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { LiteralToken } from "sparqler/tokens/LiteralToken";
import { OptionalToken } from "sparqler/tokens/OptionalToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { SubjectToken } from "sparqler/tokens/SubjectToken";
import { ValuesToken } from "sparqler/tokens/ValuesToken";

export * from "./Identifier";
export * from "./LeftSymbol";
export * from "./NewLineSymbol";
export * from "./NumberLiteral";
export * from "./Operator";
export * from "./RightSymbol";
export * from "./StringLiteral";
export * from "./Token";

export * from "./TokenNode";
export * from "./BlankNodeToken";
export * from "./VariableToken";
export * from "./IRIToken";
export * from "./PrefixedNameToken";
export * from "./NumberToken";
export * from "./LanguageToken";
export * from "./BooleanToken";
export * from "./LiteralToken";
export * from "./StringToken";
export * from "./ValuesToken";
export * from "./SubjectToken";
export * from "./PredicateToken";
export * from "./OptionalToken";
export * from "./FilterToken";
export * from "./PrefixToken";
export * from "./ConstructToken";

export type TermToken = IRIToken | PrefixedNameToken | BlankNodeToken | LiteralToken;

export type TripleToken = SubjectToken;
export type NotTripleToken = OptionalToken | FilterToken | ValuesToken;
export type PatternToken = TripleToken | NotTripleToken;

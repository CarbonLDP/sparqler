import { BindToken } from "./BindToken";
import { BlankNodeToken } from "./BlankNodeToken";
import { CollectionToken } from "./CollectionToken";
import { FilterToken } from "./FilterToken";
import { GraphToken } from "./GraphToken";
import { IRIToken } from "./IRIToken";
import { LimitToken } from "./LimitToken";
import { LiteralToken } from "./LiteralToken";
import { OffsetToken } from "./OffsetToken";
import { OptionalToken } from "./OptionalToken";
import { OrderToken } from "./OrderToken";
import { PrefixedNameToken } from "./PrefixedNameToken";
import { SelectToken } from "./SelectToken";
import { SubjectToken } from "./SubjectToken";
import { ValuesToken } from "./ValuesToken";
import { VariableToken } from "./VariableToken";

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
export * from "./GraphToken";
export * from "./BindToken";
export * from "./FilterToken";
export * from "./PrefixToken";
export * from "./ConstructToken";
export * from "./SelectToken";
export * from "./BaseToken";
export * from "./OrderToken";
export * from "./LimitToken";
export * from "./OffsetToken";
export * from "./QueryToken";
export * from "./CollectionToken";

export type VariableOrIRI = VariableToken | IRIToken | PrefixedNameToken;

export type TermToken = IRIToken | PrefixedNameToken | BlankNodeToken | LiteralToken;

export type TripleToken = SubjectToken;

export type NotTripleToken = OptionalToken | GraphToken | BindToken | FilterToken | ValuesToken;

export type PatternToken = SelectToken | TripleToken | NotTripleToken;

export type ObjectToken = VariableToken | TermToken | CollectionToken;

export type SolutionModifier = /*GroupToken | HavingToken |*/ OrderToken | LimitToken | OffsetToken;

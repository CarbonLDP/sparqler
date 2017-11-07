import { BlankNodeToken } from "sparqler/tokens/BlankNodeToken";
import { CollectionToken } from "sparqler/tokens/CollectionToken";
import { FilterToken } from "sparqler/tokens/FilterToken";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { LimitToken } from "sparqler/tokens/LimitToken";
import { LiteralToken } from "sparqler/tokens/LiteralToken";
import { OffsetToken } from "sparqler/tokens/OffsetToken";
import { OptionalToken } from "sparqler/tokens/OptionalToken";
import { OrderToken } from "sparqler/tokens/OrderToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
import { SelectToken } from "sparqler/tokens/SelectToken";
import { SubjectToken } from "sparqler/tokens/SubjectToken";
import { ValuesToken } from "sparqler/tokens/ValuesToken";
import { VariableToken } from "sparqler/tokens/VariableToken";

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

export type NotTripleToken = OptionalToken | FilterToken | ValuesToken;

export type PatternToken = SelectToken | TripleToken | NotTripleToken;

export type ObjectToken = VariableToken | TermToken | CollectionToken;

export type SolutionModifier = /*GroupToken | HavingToken |*/ OrderToken | LimitToken | OffsetToken;

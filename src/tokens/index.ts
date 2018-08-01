import { BindToken } from "sparqler/tokens/BindToken";
import { BlankNodeToken } from "sparqler/tokens/BlankNodeToken";
import { CollectionToken } from "sparqler/tokens/CollectionToken";
import { FilterToken } from "sparqler/tokens/FilterToken";
import { GraphToken } from "sparqler/tokens/GraphToken";
import { IRIToken } from "sparqler/tokens/IRIToken";
import { LiteralToken } from "sparqler/tokens/LiteralToken";
import { OptionalToken } from "sparqler/tokens/OptionalToken";
import { PrefixedNameToken } from "sparqler/tokens/PrefixedNameToken";
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

export * from "./PatternToken";

export type ObjectToken = VariableToken | TermToken | CollectionToken;

export * from "./SolutionModifierToken";

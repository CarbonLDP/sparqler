import { BindToken } from "./BindToken";
import { FilterToken } from "./FilterToken";
import { GraphToken } from "./GraphToken";
import { GroupPatternToken } from "./GroupPatternToken";
import { MinusPatternToken } from "./MinusPatternToken";
import { OptionalToken } from "./OptionalToken";
import { ServicePatternToken } from "./ServicePatternToken";
import { UnionPatternToken } from "./UnionPatternToken";
import { ValuesToken } from "./ValuesToken";


export type NotTripleToken =
	| GroupPatternToken
	| UnionPatternToken
	| MinusPatternToken
	| ServicePatternToken
	| OptionalToken
	| GraphToken
	| BindToken
	| FilterToken
	| ValuesToken
	;

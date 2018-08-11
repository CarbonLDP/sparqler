import {
	GraphPattern,
	PatternBuilder,
	SupportedNativeTypes,
	Undefined,
} from "sparqler/patterns";
import {
	Literal,
	Resource,
} from "sparqler/patterns/triples";


export interface FinishClause {
	toCompactString():string;
	toPrettyString():string;
	toString():string;
}

export interface SubFinishClause extends GraphPattern {}

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


export interface ValuesClause<T extends FinishClause | SubFinishClause = FinishClause> {
	values( variable:string, values: SupportedNativeTypes | SupportedNativeTypes[] ): T;
	values( variable:string, valuesBuilder:( builder:PatternBuilder ) => ( SupportedNativeTypes | Resource | Literal | Undefined ) | ( SupportedNativeTypes | Resource | Literal | Undefined )[]  ): T;
	values( variables:string[], values: SupportedNativeTypes[] | SupportedNativeTypes[][] ): T;
	values( variables:string[], valuesBuilder:( builder:PatternBuilder ) => ( SupportedNativeTypes | Resource | Literal | Undefined )[] | ( SupportedNativeTypes | Resource | Literal | Undefined )[][]  ): T;
}

export interface FinishClause {
	toCompactString():string;
	toPrettyString():string;
	toString():string;
}

export interface SubFinishClause extends GraphPattern {}

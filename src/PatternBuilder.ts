import {
	GraphPattern,
	Variable,
	TriplesPatternBuilder,
	NotTriplesPatternBuilder,
	Resource,
	TriplesSameSubject,
	TriplesPattern,
	TriplesNodePattern,
	Collection,
	BlankNode,
	supportedNativeTypes,
	NotTriplesPattern,
	ValuesPattern,
	MultipleValuesPattern
} from "./Patterns";
import {
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral,
	Literal
} from "./Patterns/Literals";

export type Undefined = "UNDEF";
export class PatternBuilder implements TriplesPatternBuilder,
                                       NotTriplesPatternBuilder {

	public undefined:Undefined = "UNDEF";

	constructor( private vocab?:string ) {
	}

	resource( iri:string ):Resource & TriplesSameSubject<TriplesPattern> {
		return undefined;
	}

	var( name:string ):Variable & TriplesSameSubject<TriplesPattern> {
		return undefined;
	}

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;
	literal( value ):any {
	}

	collection( ...values:(supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):Collection & TriplesSameSubject<TriplesNodePattern> {
		return undefined;
	}

	blankNode():BlankNode &  TriplesSameSubject<TriplesNodePattern> {
		return undefined;
	}

	graph( iri:string, pattern:GraphPattern ):NotTriplesPattern;
	graph( iri:string, patterns:GraphPattern[] ):NotTriplesPattern;
	graph( variable:Variable, pattern:GraphPattern ):NotTriplesPattern;
	graph( variable:Variable, patterns:GraphPattern[] ):NotTriplesPattern;
	graph( iri, pattern ):NotTriplesPattern {
		return undefined;
	}

	optional( pattern:GraphPattern ):NotTriplesPattern;
	optional( patterns:GraphPattern[] ):NotTriplesPattern;
	optional( pattern ):NotTriplesPattern {
		return undefined;
	}

	union( pattern1:GraphPattern, pattern2:GraphPattern ):NotTriplesPattern;
	union( pattern1:GraphPattern, patterns2:GraphPattern[] ):NotTriplesPattern;
	union( patterns1:GraphPattern[], pattern2:GraphPattern ):NotTriplesPattern;
	union( patterns1:GraphPattern[], patterns2:GraphPattern[] ):NotTriplesPattern;
	union( pattern1, pattern2 ):NotTriplesPattern {
		return undefined;
	}

	minus( pattern:GraphPattern ):NotTriplesPattern;
	minus( patterns:GraphPattern[] ):NotTriplesPattern;
	minus( pattern ):NotTriplesPattern {
		return undefined;
	}

	values( variable:Variable ):ValuesPattern;
	values( ...variables:Variable[] ):MultipleValuesPattern;
	values( ...variable ):any {
	}

}

export default PatternBuilder;
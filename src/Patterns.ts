import { Undefined } from "./PatternBuilder";
import {
	Literal,
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral
} from "./Patterns/Literals";
import { Resource } from "./Patterns/Resource";
import { Variable } from "./Patterns/Variable";

export interface IRIResolver {
	_resolveIRI( iri:string, vocab?:boolean ):string;
}

export interface GraphPattern {
	getPattern():string;
}

export interface NotTriplesPatternBuilder {
	graph( iri:string, pattern:GraphPattern ):NotTriplesPattern;
	graph( iri:string, patterns:GraphPattern[] ):NotTriplesPattern;

	graph( variable:Variable, pattern:GraphPattern ):NotTriplesPattern;
	graph( variable:Variable, patterns:GraphPattern[] ):NotTriplesPattern;

	optional( pattern:GraphPattern ):NotTriplesPattern;
	optional( patterns:GraphPattern[] ):NotTriplesPattern;

	union( pattern1:GraphPattern, pattern2:GraphPattern ):NotTriplesPattern;
	union( pattern1:GraphPattern, patterns2:GraphPattern[] ):NotTriplesPattern;
	union( patterns1:GraphPattern[], pattern2:GraphPattern ):NotTriplesPattern;
	union( patterns1:GraphPattern[], patterns2:GraphPattern[] ):NotTriplesPattern;

	minus( pattern:GraphPattern ):NotTriplesPattern;
	minus( patterns:GraphPattern[] ):NotTriplesPattern;

	undefined:Undefined;
	values( variable:Variable ):ValuesPattern
	values( ...variables:Variable[] ):MultipleValuesPattern;

	// TODO: BIND pattern
	// TODO: FILTER pattern
	// TODO: SERVICE pattern
}

// Internal interface
export interface NotTriplesPattern extends GraphPattern {
}

export interface ValuesPattern {
	has( value:supportedNativeTypes ):ValuesPatternMore & NotTriplesPattern;
	has( value:Resource ):ValuesPatternMore & NotTriplesPattern;
	has( value:Literal ):ValuesPatternMore & NotTriplesPattern;
	has( value:Undefined ):ValuesPatternMore & NotTriplesPattern;
}
export interface ValuesPatternMore {
	and( value:supportedNativeTypes ):ValuesPatternMore & NotTriplesPattern;
	and( value:Resource ):ValuesPatternMore & NotTriplesPattern;
	and( value:Literal ):ValuesPatternMore & NotTriplesPattern;
	and( value:Undefined ):ValuesPatternMore & NotTriplesPattern;
}

export interface MultipleValuesPattern {
	has( ...values:( supportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore & NotTriplesPattern;
}
export interface MultipleValuesPatternMore {
	and( ...values:( supportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore & NotTriplesPattern;
}

export type supportedNativeTypes = boolean | number | string | Date;

export interface TriplesPatternBuilder {
	resource( iri:string ):Resource;

	var( name:string ):Variable;

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;

	collection( ...values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):Collection & TriplesSameSubject<TriplesNodePattern>;

	/**
	 * With this form, there is no current way to form the pattern:
	 *  [ ?var1 "ex:some-1" "Object" ] "ex:some-2" ?object.
	 *
	 * Should add method for this cases??
	 *    blankNode().has( "ex:prop-1", ":someone" )
	 *      .asTripleSubject()
	 *      .has( "ex:prop-2", ":anotherone" )
	 *  */
	blankNode():BlankNode & TriplesSameSubject<TriplesNodePattern>;
}

// TODO: Create and accept PATHs as property
export interface TriplesSameSubject<T> {
	has( propertyIRI:string, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyIRI:string, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;

	has( propertyVariable:Variable, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, resource:Resource ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, variable:Variable ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, literal:Literal ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( propertyVariable:Variable, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
}

// TODO: Create and accept PATHs as property
export interface TriplesSameSubjectMore<T> {
	and( propertyIRI:string, resource:Resource ):TriplesSameSubjectMore<T> & T;
	and( propertyIRI:string, variable:Variable ):TriplesSameSubjectMore<T> & T;
	and( propertyIRI:string, literal:Literal ):TriplesSameSubjectMore<T> & T;
	and( propertyIRI:string, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	and( propertyIRI:string, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	and( propertyIRI:string, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;

	and( propertyVariable:Variable, resource:Resource ):TriplesSameSubjectMore<T> & T;
	and( propertyVariable:Variable, variable:Variable ):TriplesSameSubjectMore<T> & T;
	and( propertyVariable:Variable, literal:Literal ):TriplesSameSubjectMore<T> & T;
	and( propertyVariable:Variable, node:TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	and( propertyVariable:Variable, value:supportedNativeTypes ):TriplesSameSubjectMore<T> & T;
	and( propertyVariable:Variable, values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):TriplesSameSubjectMore<T> & T;
}

// Internal interface

// Internal interface
export interface TriplesNodePattern extends GraphPattern {
}

// Internal interface
export interface BlankNode extends TriplesNodePattern {
}

// Internal interface
export interface Collection extends TriplesNodePattern {
}

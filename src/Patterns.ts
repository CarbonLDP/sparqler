import { Undefined } from "./PatternBuilder";
import {
	Literal,
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral
} from "./TriplesPatterns/Literals";
import { Resource } from "./TriplesPatterns/Resource";
import { Variable } from "./TriplesPatterns/Variable";
import { Token } from "./Tokens/Token";
import { BlankNode } from "./TriplesPatterns/BlankNode";
import { Collection } from "./TriplesPatterns/Collection";
import { NotTriplesPattern } from "./NotTriplesPatterns/NotTriplesPattern";

export interface IRIResolver {
	_resolveIRI( iri:string, vocab?:boolean ):Token[];
}

export interface ElementPattern {
	getSelfTokens():Token[];
}

export interface GraphPattern {
	getPattern():Token[];
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
	minus( firstPattern:GraphPattern, ...restPatterns:GraphPattern[] ):NotTriplesPattern;

	undefined:Undefined;
	values( variable:Variable ):SingleValuesPattern
	values( ...variables:Variable[] ):MultipleValuesPattern;

	// TODO: BIND pattern
	// TODO: FILTER pattern
	// TODO: SERVICE pattern
}

export interface SingleValuesPattern extends NotTriplesPattern {
	has( value:supportedNativeTypes ):SingleValuesPatternMore;
	has( value:Resource ):SingleValuesPatternMore;
	has( value:Literal ):SingleValuesPatternMore;
	has( value:Undefined ):SingleValuesPatternMore;
}
export interface SingleValuesPatternMore extends NotTriplesPattern {
	and( value:supportedNativeTypes ):SingleValuesPatternMore;
	and( value:Resource ):SingleValuesPatternMore;
	and( value:Literal ):SingleValuesPatternMore;
	and( value:Undefined ):SingleValuesPatternMore;
}

export interface MultipleValuesPattern extends NotTriplesPattern {
	has( ...values:( supportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore;
}
export interface MultipleValuesPatternMore extends NotTriplesPattern {
	and( ...values:( supportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore;
}

export type supportedNativeTypes = boolean | number | string | Date;

export interface TriplesPatternBuilder {
	resource( iri:string ):Resource;

	var( name:string ):Variable;

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;

	collection( ...values:( supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):Collection;

	/**
	 * With this form, there is no current way to form the pattern:
	 *  [ ?var1 "ex:some-1" "Object" ] "ex:some-2" ?object.
	 *
	 * Should add method for this cases??
	 *    blankNode().has( "ex:prop-1", "someone" )
	 *      .asTripleSubject()
	 *      .has( "ex:prop-2", "another-one" )
	 *  */
	blankNode():BlankNode;
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

export interface TriplesNodePattern extends GraphPattern, ElementPattern {}

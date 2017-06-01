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

	service( resource:string | Resource | Variable, patterns:GraphPattern | GraphPattern[] ):NotTriplesPattern;
	serviceSilent( resource:string | Resource | Variable, patterns:GraphPattern | GraphPattern[] ):NotTriplesPattern;

	// TODO: Add expression support for this patterns
	bind( rawExpression:string, variable:string | Variable ):NotTriplesPattern;
	filter( rawConstraint:string ):NotTriplesPattern;
}

export interface SingleValuesPattern extends NotTriplesPattern {
	has( value:SupportedNativeTypes ):SingleValuesPatternMore;
	has( value:Resource ):SingleValuesPatternMore;
	has( value:Literal ):SingleValuesPatternMore;
	has( value:Undefined ):SingleValuesPatternMore;
}
export interface SingleValuesPatternMore extends NotTriplesPattern {
	and( value:SupportedNativeTypes ):SingleValuesPatternMore;
	and( value:Resource ):SingleValuesPatternMore;
	and( value:Literal ):SingleValuesPatternMore;
	and( value:Undefined ):SingleValuesPatternMore;
}

export interface MultipleValuesPattern extends NotTriplesPattern {
	has( ...values:( SupportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore;
}
export interface MultipleValuesPatternMore extends NotTriplesPattern {
	and( ...values:( SupportedNativeTypes | Resource | Literal | Undefined )[] ):MultipleValuesPatternMore;
}

export type SupportedNativeTypes = boolean | number | string | Date;

export interface TriplesPatternBuilder {
	resource( iri:string ):Resource;

	var( name:string ):Variable;

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;

	collection( ...values:( SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern )[] ):Collection;

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
	has( property:string | Variable | Resource, object:SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	has( property:string | Variable | Resource, objects:(SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):TriplesSameSubjectMore<T> & T;
}

// TODO: Create and accept PATHs as property
export interface TriplesSameSubjectMore<T> {
	and( property:string | Variable | Resource, object:SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern ):TriplesSameSubjectMore<T> & T;
	and( property:string | Variable | Resource, objects:(SupportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):TriplesSameSubjectMore<T> & T;
}

export interface TriplesNodePattern extends GraphPattern, ElementPattern {}

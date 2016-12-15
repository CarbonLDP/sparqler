import {
	GraphPattern,
	TriplesPatternBuilder,
	NotTriplesPatternBuilder,
	TriplesSameSubject,
	supportedNativeTypes,
	NotTriplesPattern,
	ValuesPattern,
	MultipleValuesPattern,
	IRIResolver,
	TriplesNodePattern
} from "./Patterns";
import {
	RDFLiteral,
	NumericLiteral,
	BooleanLiteral,
	Literal
} from "./Patterns/Literals";
import { Resource } from "./Patterns/Resource";
import { Variable } from "./Patterns/Variable";
import { BlankNode } from "./Patterns/BlankNode";
import { Collection } from "./Patterns/Collection";

export type Undefined = "UNDEF";
export class PatternBuilder implements TriplesPatternBuilder,
                                       NotTriplesPatternBuilder {

	public undefined:Undefined = "UNDEF";

	private resolver:IRIResolver;

	constructor( resolver:IRIResolver ) {
		this.resolver = resolver;
	}

	resource( iri:string ):Resource {
		return new Resource( this.resolver, iri );
	}

	var( name:string ):Variable {
		return new Variable( this.resolver, name );
	}

	literal( value:string ):RDFLiteral;
	literal( value:number ):NumericLiteral;
	literal( value:boolean ):BooleanLiteral;
	literal( value ):any {
		if( typeof value === "string" || value instanceof String )
			return new RDFLiteral( this.resolver, value as string );

		if( typeof value === "number" || value instanceof Number )
			return new NumericLiteral( this.resolver, value as number );

		if( typeof value === "boolean" || value instanceof Boolean )
			return new BooleanLiteral( this.resolver, value as boolean );

		throw new Error( "InvalidArgumentError: No valid value of a literal was provided." );
	}

	collection( ...values:(supportedNativeTypes | Resource | Variable | Literal | TriplesNodePattern)[] ):Collection {
		if( values.length === 0 ) throw Error( "InvalidArgumentError: The collection needs at least one value." );
		return new Collection( this.resolver, values );
	}

	blankNode():BlankNode {
		return new BlankNode( this.resolver );
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